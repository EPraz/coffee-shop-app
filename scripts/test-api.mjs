import { spawn, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const envFile = resolve(root, "server/.env.test");
if (existsSync(envFile)) process.loadEnvFile(envFile);
const url = new URL(process.env.DATABASE_URL ?? "postgresql://missing/invalid");
if (
  !["127.0.0.1", "localhost"].includes(url.hostname) ||
  !url.pathname.endsWith("_test")
) {
  throw new Error(
    "Test server requires a local database whose name ends in _test",
  );
}
process.env.NODE_ENV = "test";
process.env.PORT = "43176";
const run = (args) => {
  const result = spawnSync(process.execPath, args, {
    cwd: root,
    env: process.env,
    stdio: "inherit",
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
};
run([
  "node_modules/prisma/build/index.js",
  "generate",
  "--schema",
  "server/prisma/schema.prisma",
]);
run(["node_modules/typescript/bin/tsc", "-p", "server/tsconfig.json"]);
run([
  "node_modules/prisma/build/index.js",
  "migrate",
  "reset",
  "--force",
  "--skip-seed",
  "--skip-generate",
  "--schema",
  "server/prisma/schema.prisma",
]);
run(["node_modules/tsx/dist/cli.mjs", "server/prisma/seed.ts"]);
const child = spawn(process.execPath, ["server/dist/server/src/main.js"], {
  cwd: root,
  env: process.env,
  stdio: "inherit",
});
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () => child.kill(signal));
child.on("exit", (code) => {
  process.exitCode = code ?? 1;
});
