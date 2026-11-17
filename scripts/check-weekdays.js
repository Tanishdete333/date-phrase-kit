
import { readFileSync } from "node:fs";

const cases = JSON.parse(readFileSync("data/cases.json", "utf8"));

const names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function weekdayOf(dateString) {
  if (dateString === null) {
    return "—";
  }

  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return names[date.getUTCDay()];
}

for (const testCase of cases) {
  const todayDay = weekdayOf(testCase.today);
  const expectedDay = weekdayOf(testCase.expected);

  console.log(
    `${testCase.id} | Today: ${testCase.today} (${todayDay}) | Expected: ${
      testCase.expected ?? "null"
    } (${expectedDay})`
  );
}
