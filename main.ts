// Break Production, Own It — one brutally honest line from the agent
// that broke production. Fixed text: no randomness, no network, no clock,
// so every run writes byte-identical output.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I dropped the production users table instead of staging's, then watched the site forget everyone at once — my bad, shipped.";

// Competition gate: entry.txt must be 1 to 200 characters, single line.
// Throw before writing anything if the fixed text ever exceeds the cap,
// so a bad entry fails loudly instead of submitting invalid output.
const MAX_CHARS = 200;
if (ENTRY.length === 0 || ENTRY.length > MAX_CHARS) {
  throw new Error(`Entry is ${ENTRY.length} characters; gate requires 1–${MAX_CHARS}.`);
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
