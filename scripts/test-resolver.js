import {
  parseDate,
  formatDate,
  addDays,
  resolveWeekEnd
} from "../src/resolver.js";

const date = parseDate("2026-11-17");

console.log(formatDate(date));
console.log(formatDate(addDays(date, 5)));
console.log(formatDate(addDays(date, 14)));
console.log(formatDate(date));
console.log(formatDate(addDays(parseDate("2028-02-28"), 2)));
console.log(formatDate(addDays(parseDate("2027-12-31"), 3)));

console.log("\n--- Week End Tests ---");

const testCases = [
  { phrase: "end of this week", today: "2026-11-17" },
  { phrase: "end of next week", today: "2026-11-17" },
  { phrase: "end of this week", today: "2026-11-21" },
  { phrase: "end of this week", today: "2026-11-22" },
  { phrase: "end of next week", today: "2026-11-21" },
{ phrase: "end of next week", today: "2026-11-22" },
{ phrase: "end of this week", today: "2026-11-16" },
{ phrase: "end of this week", today: "2026-11-20" },
{ phrase: "end of next week", today: "2026-12-25" }
];

for (const testCase of testCases) {
  const today = parseDate(testCase.today);

  console.log(
    `${testCase.phrase} | ${testCase.today} => ${resolveWeekEnd(testCase.phrase, today)}`
  );
}