import { rmSync } from "node:fs";
import { dirname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputs = { api: "apps/api/dist", contracts: "packages/contracts/dist" };
const output = outputs[process.argv[2]];
if (!output) throw new Error("Choose a known build output: api or contracts");
const target = resolve(root, output);
if (!target.startsWith(root + sep))
  throw new Error("Build output leaves workspace");
rmSync(target, { recursive: true, force: true });
