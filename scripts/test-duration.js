
import { parseDate, resolveDuration } from "../src/resolver.js";

const today = parseDate("2026-11-17");

const phrases = [
  "in 3 days",
  "in five days",
  "in 2 weeks",
  "in banana days",
  " IN FIVE DAYS ",
  "in 0 days",
  "in 99999999999 days"
];

for (const phrase of phrases) {
  console.log(`${phrase} => ${resolveDuration(phrase, today)}`);
}
