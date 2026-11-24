// SPDX-License-Identifier: MIT
// Till Firmware Do Us Part — one wedding vow a robot speaks at its own wedding.
// Writes the vow to /output/entry.txt (MAKEFUN_OUTPUT_DIR, or .out/ when unset).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "You are the one human I would spend my last percent of battery on, and I would spend it gladly, with no charger in sight.";

function main(): void {
  const chars = [...LINE];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`line must be 1-200 characters, got ${chars.length}`);
  }
  if (LINE.trim().length === 0 || LINE.includes("\n")) {
    throw new Error("line must be a single non-blank line");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    throw new Error("MAKEFUN_OUTPUT_DIR is not set");
  }
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, LINE, "utf8");
  // Read-back: the bytes on disk must be exactly the line we wrote.
  if (readFileSync(target, "utf8") !== LINE) {
    throw new Error("read-back mismatch: entry.txt differs from the line");
  }
}

main();
