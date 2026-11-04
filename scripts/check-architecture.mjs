import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const config = JSON.parse(fs.readFileSync("architecture.config.json", "utf8"));
const roots = [config.webRoot, config.apiRoot, config.contractsRoot];
const errors = [];
const normalize = (value) => value.replaceAll("\\", "/");
const under = (file, root) => file === root || file.startsWith(root + "/");
function walk(root) {
  return fs.readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const file = normalize(path.join(root, entry.name));
    return entry.isDirectory()
      ? walk(file)
      : /\.tsx?$/.test(file)
        ? [file]
        : [];
  });
}
const sources = roots.flatMap(walk);
const graph = new Map(sources.map((file) => [file, []]));
const modules = new Map();
const classes = [];
function resolve(owner, specifier) {
  if (specifier.startsWith(config.contractsPackage + "/"))
    return `${config.contractsRoot}/${specifier.split("/").at(-1)}.ts`;
  if (!specifier.startsWith(".")) return null;
  const base = normalize(
    path.normalize(path.join(path.dirname(owner), specifier)),
  );
  return (
    [
      base,
      ...[".ts", ".tsx", "/index.ts", "/index.tsx"].map(
        (suffix) => base + suffix,
      ),
    ].find((file) => fs.existsSync(file)) ?? null
  );
}
function decorator(node, name) {
  return (ts.getDecorators(node) ?? []).find(
    (item) =>
      ts.isCallExpression(item.expression) &&
      item.expression.expression.getText() === name,
  )?.expression;
}
function arrayProperty(object, name) {
  const property = object?.properties.find(
    (item) => item.name?.getText() === name,
  );
  if (!property) return [];
  if (
    !ts.isArrayLiteralExpression(property.initializer) ||
    property.initializer.elements.some((item) => !ts.isIdentifier(item))
  ) {
    errors.push(
      `Module ${name} must declare explicit identifiers for auditability`,
    );
    return [];
  }
  return property.initializer.elements.map((item) => item.text);
}
for (const file of [...sources, ...config.testRoots.flatMap(walk)]) {
  const source = fs.readFileSync(file, "utf8");
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
  if (
    sources.includes(file) &&
    source.trimEnd().split(/\r?\n/).length > config.maxSourceLines
  )
    errors.push(
      `${file}: exceeds reviewed source size (${config.maxSourceLines})`,
    );
  for (const statement of ast.statements) {
    if (
      (ts.isImportDeclaration(statement) ||
        ts.isExportDeclaration(statement)) &&
      statement.moduleSpecifier
    ) {
      const specifier = statement.moduleSpecifier.text;
      const target = resolve(file, specifier);
      if (specifier.startsWith(".") && !target)
        errors.push(`${file}: unresolved local import ${specifier}`);
      if (under(file, config.contractsRoot) && !specifier.startsWith("."))
        errors.push(
          `${file}: contracts depend on external implementation ${specifier}`,
        );
      if (target) {
        if (
          (under(file, config.webRoot) && under(target, config.apiRoot)) ||
          (under(file, config.apiRoot) && under(target, config.webRoot))
        )
          errors.push(`${file}: cross-application import ${specifier}`);
        if (
          under(file, config.contractsRoot) &&
          !under(target, config.contractsRoot)
        )
          errors.push(`${file}: contracts depend on an application`);
        if (
          under(file, config.webRoot + "/shared") &&
          (under(target, config.webRoot + "/features") ||
            under(target, config.webRoot + "/app"))
        )
          errors.push(
            `${file}: shared UI/API depends on a feature or composition`,
          );
        if (
          (under(file, config.apiRoot + "/infrastructure") ||
            under(file, config.apiRoot + "/common")) &&
          under(target, config.apiRoot + "/modules")
        )
          errors.push(`${file}: infrastructure depends on a business module`);
        if (
          config.testRoots.some((root) => under(file, root)) &&
          roots.slice(0, 2).some((root) => under(target, root))
        )
          errors.push(`${file}: workflow test imports application internals`);
        if (
          !under(file, config.contractsRoot) &&
          under(target, config.contractsRoot) &&
          !specifier.startsWith(config.contractsPackage + "/")
        )
          errors.push(`${file}: use the contracts workspace interface`);
        const typeOnly =
          statement.importClause?.isTypeOnly || statement.isTypeOnly;
        if (!typeOnly && graph.has(file) && graph.has(target))
          graph.get(file).push(target);
      }
    }
    if (ts.isClassDeclaration(statement)) {
      const module = decorator(statement, "Module");
      if (module) {
        const object = module.arguments[0];
        modules.set(statement.name.text, {
          file,
          imports: arrayProperty(object, "imports"),
          providers: arrayProperty(object, "providers"),
          controllers: arrayProperty(object, "controllers"),
          exports: arrayProperty(object, "exports"),
        });
      } else if (
        decorator(statement, "Injectable") ||
        decorator(statement, "Controller")
      )
        classes.push({ name: statement.name.text, file, node: statement });
    }
  }
}
const owners = new Map();
for (const [name, module] of modules)
  for (const item of [...module.providers, ...module.controllers]) {
    if (owners.has(item))
      errors.push(`${item}: provided by both ${owners.get(item)} and ${name}`);
    owners.set(item, name);
  }
for (const { name, file, node } of classes) {
  const owner = modules.get(owners.get(name));
  if (!owner) {
    errors.push(`${file}: ${name} has no module owner`);
    continue;
  }
  for (const member of node.members)
    if (ts.isConstructorDeclaration(member))
      for (const parameter of member.parameters) {
        const token = decorator(parameter, "Inject")?.arguments[0]?.getText();
        if (
          token &&
          !owner.providers.includes(token) &&
          !owner.imports.some((dependency) =>
            modules.get(dependency)?.exports.includes(token),
          )
        )
          errors.push(
            `${file}: ${token} is not provided locally or exported by an imported module`,
          );
      }
}
for (const entry of fs.readdirSync(config.apiRoot + "/modules", {
  withFileTypes: true,
}))
  if (
    entry.isDirectory() &&
    !fs.existsSync(
      `${config.apiRoot}/modules/${entry.name}/${entry.name}.module.ts`,
    )
  )
    errors.push(`${entry.name}: feature directory lacks its NestJS module`);
for (const file of sources.filter(
  (file) => path.posix.dirname(file) === config.apiRoot,
))
  if (!["main.ts", "app.module.ts"].includes(path.posix.basename(file)))
    errors.push(
      `${file}: API implementation belongs to a feature or infrastructure owner`,
    );
for (const workspace of config.requiredWorkspaces)
  if (!fs.existsSync(workspace + "/package.json"))
    errors.push(`${workspace}: missing workspace manifest`);
const active = new Set(),
  visited = new Set();
function checkCycles(file, trail = []) {
  if (active.has(file)) {
    errors.push(`Import cycle: ${[...trail, file].join(" -> ")}`);
    return;
  }
  if (visited.has(file)) return;
  active.add(file);
  for (const dependency of graph.get(file) ?? [])
    checkCycles(dependency, [...trail, file]);
  active.delete(file);
  visited.add(file);
}
for (const file of graph.keys()) checkCycles(file);
if (errors.length) {
  for (const error of new Set(errors)) console.error(error);
  process.exitCode = 1;
} else
  console.log(
    `Architecture passed: ${sources.length} source files, ${modules.size} NestJS modules, explicit provider ownership and no import cycles`,
  );
