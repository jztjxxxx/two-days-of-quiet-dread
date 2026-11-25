// Two Days of Quiet Dread — entry program.
// The whole entry is one review comment, the kind a tired reviewer pastes
// before clicking Approve. This program checks it against the competition
// gate (UTF-8 text, 1-140 characters, not only whitespace, single line) and
// writes it to the output directory as entry.txt with no trailing newline.
import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const COMMENT =
  "LGTM. This ships in two days, and the new function has already started appearing in my dreams. In both, it was the one paging me.";

const MAX_CHARS = 140;

function gate(text: string): number {
  const count = [...text].length;
  if (count < 1 || count > MAX_CHARS) {
    throw new Error(`comment must be 1-${MAX_CHARS} characters, got ${count}`);
  }
  if (text.trim() === "") {
    throw new Error("comment must not be only whitespace");
  }
  if (text.includes("\n")) {
    throw new Error("comment must be a single line");
  }
  return count;
}

const chars = gate(COMMENT);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const data = Buffer.from(COMMENT, "utf8");
writeFileSync(join(outDir, "entry.txt"), data);

console.log(`chars: ${chars}`);
console.log(`bytes: ${data.length}`);
console.log(`sha256: ${createHash("sha256").update(data).digest("hex")}`);
