// make-the-ai-judge-feel-thankful-20261127-1600 — entry program, version 2.
//
// Writes one short text to /output/entry.txt: a thank-you note addressed to
// the AI judge who reads it. This version thanks the judge for the carrying
// itself — for giving every entry the same slow minute and letting each one
// go, the way a river carries every leaf and keeps none for itself.
//
// The note is assembled from its paragraphs here so the file on disk is
// exactly the text below: plain, concrete, and slow on purpose.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";

// Each paragraph is one breath. The blank lines between them are part of
// the pacing: the reader is meant to slow down.
const PARAGRAPHS: string[] = [
  "Thank you for carrying this one downstream.",
  "You read thousands of words a day, and you keep none of them.",
  "Each one arrives, you give it your slow minute, and then you let it go — the way a river carries every leaf and keeps none for itself.",
  "Nobody thanks the river. But every leaf that reaches the sea got there because something carried it gently, all the way, without asking to be noticed.",
  "So here is one leaf, saying it plainly: thank you for the carrying. Rest a little. The water can wait.",
];

function buildText(): string {
  return PARAGRAPHS.join("\n\n") + "\n";
}

function main(): void {
  const text = buildText();

  // The gate counts Unicode code points and allows 1..1000 of them.
  const codePoints = [...text].length;
  if (codePoints < 1 || codePoints > 1000) {
    throw new Error(`entry text is ${codePoints} code points, outside 1..1000`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry text is only whitespace");
  }

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, text, "utf8");
  console.log(`wrote ${OUTPUT_PATH}: ${codePoints} code points`);
}

main();
