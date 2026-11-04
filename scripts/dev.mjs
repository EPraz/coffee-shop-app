import { spawn, spawnSync } from "node:child_process";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const contracts = spawnSync(
  process.execPath,
  ["node_modules/typescript/bin/tsc", "-p", "packages/contracts/tsconfig.json"],
  { cwd: root, stdio: "inherit" },
);
if (contracts.status !== 0) process.exit(contracts.status ?? 1);
const children = [
  spawn(
    process.execPath,
    [
      "node_modules/typescript/bin/tsc",
      "-p",
      "packages/contracts/tsconfig.json",
      "--watch",
      "--preserveWatchOutput",
    ],
    { cwd: root, stdio: "inherit" },
  ),
  spawn(
    process.execPath,
    [resolve(root, "node_modules/tsx/dist/cli.mjs"), "watch", "src/main.ts"],
    { cwd: resolve(root, "apps/api"), stdio: "inherit" },
  ),
  spawn(
    process.execPath,
    [
      "node_modules/vite/bin/vite.js",
      "apps/web",
      "--host",
      "127.0.0.1",
      "--port",
      "43174",
      "--strictPort",
    ],
    { cwd: root, stdio: "inherit" },
  ),
];
let stopping = false;
function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) child.kill("SIGTERM");
  process.exitCode = code;
}
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => stop());
for (const child of children) {
  child.on("error", () => stop(1));
  child.on("exit", (code) => stop(code ?? 1));
}
