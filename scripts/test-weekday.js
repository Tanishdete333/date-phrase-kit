import { parseDate, resolveWeekday } from "../src/resolver.js";

const testCases = [
  { phrase: "on Wednesday", today: "2026-11-16" },
  { phrase: "on Friday", today: "2027-05-14" },
  { phrase: "on Monday", today: "2027-05-15" },
  { phrase: "this Wednesday", today: "2026-12-28" },
  { phrase: "next Tuesday", today: "2028-02-27" },
  { phrase: "next Wednesday", today: "2026-11-16" },
{ phrase: "this Wednesday", today: "2026-11-19" },
{ phrase: "on Wednesday", today: "2026-11-18" },
{ phrase: "this Wednesday", today: "2026-11-19" },
{ phrase: "this Wednesday", today: "2026-11-18" }
];

for (const testCase of testCases) {
  const today = parseDate(testCase.today);

  console.log(
    `${testCase.phrase} | ${testCase.today} => ${resolveWeekday(testCase.phrase, today)}`
  );
}