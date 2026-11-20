import { readFileSync } from "node:fs";
import { scoreAll } from "../src/scorer.js";

const cases = JSON.parse(
  readFileSync("data/cases.json", "utf8")
);

const scores = scoreAll(cases);

console.log("\n--- DATE PHRASE KIT SCORE ---\n");

console.log(JSON.stringify(scores, null, 2));