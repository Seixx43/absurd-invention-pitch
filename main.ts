// Entry for the make.fun bounty "One-Sentence Absurd Invention Pitch":
// reads ENTRY.md and writes it to $MAKEFUN_OUTPUT_DIR/entry.txt.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const entry = readFileSync(join(here, "ENTRY.md"), "utf8");
// The bounty wants one sentence. Fail loudly instead of writing an entry that
// runs to a second sentence.
const text = entry.trim();
if (!text.endsWith(".") || text.slice(0, -1).includes(". ")) {
  process.stderr.write("invention pitch must be exactly one sentence\n");
  process.exit(1);
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
process.stdout.write(entry);
