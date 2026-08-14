import fs from "node:fs";
import path from "node:path";
import { gunzipSync } from "node:zlib";
import { createHash } from "node:crypto";

const dir = "transcript";
const parts = fs
  .readdirSync(dir)
  .filter((name) => name.startsWith("source.md.gz.b64.part-"))
  .sort();

if (parts.length === 0) {
  throw new Error("No transcript archive parts found");
}

const b64 = parts
  .map((name) => fs.readFileSync(path.join(dir, name), "utf8"))
  .join("");

const source = gunzipSync(Buffer.from(b64, "base64"));
const sha256 = createHash("sha256").update(source).digest("hex");
const expected = "3ba8e2b5bd5b6835ab41cbd6081761aadab82eea8405ae7ee7e6e59d09c96e8a";

if (sha256 !== expected) {
  throw new Error(`Transcript SHA-256 mismatch: ${sha256}`);
}

const output = process.argv[2] ?? "Transcript.full.md";
fs.writeFileSync(output, source);
console.log(`Wrote ${output}`);
console.log(`sha256 ${sha256}`);
