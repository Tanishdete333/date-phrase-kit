import {
  parseDate,
  formatDate,
  addDays,
  resolveWeekEnd,
  resolve
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
console.log("\n--- Main Resolver Tests ---");

const resolveTests = [
  ["in 3 days", "2026-11-17"],
  ["end of next week", "2026-11-17"],
  ["on Wednesday", "2026-11-16"],
  ["banana phrase", "2026-11-17"]
];

for (const [phrase, today] of resolveTests) {
  console.log(`${phrase} => ${resolve(phrase, today)}`);
}

console.log("\n--- Corrected Weekday Tests ---");

console.log(
  `Thursday: ${resolve("this Wednesday", "2026-11-19")}`
);

console.log(
  `Wednesday: ${resolve("this Wednesday", "2026-11-18")}`
);
console.log("\n--- End Of Month Tests ---");

const monthTests = [
  ["end of the month", "2026-12-31"],
  ["by the last day of February", "2027-02-10"],
  ["by the end of January", "2028-01-29"],
  ["on the final day of April", "2026-04-30"]
];

for (const [phrase, today] of monthTests) {
  console.log(`${phrase} => ${resolve(phrase, today)}`);
}

console.log("\n--- Time Of Day Tests ---");

const timeTests = [
  ["by EOD", "2026-11-17"],
  ["by 5 PM", "2027-07-31"],
  ["tomorrow morning", "2026-11-17"]
];

for (const [phrase, today] of timeTests) {
  console.log(`${phrase} => ${resolve(phrase, today)}`);
}
console.log(
  "end of month =>",
  resolve("end of month", "2026-11-17")
);