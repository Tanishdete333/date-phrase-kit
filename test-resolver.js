
import { parseDate, formatDate, addDays } from "./src/resolver.js";

const date = parseDate("2026-11-17");

console.log(formatDate(date));
console.log(formatDate(addDays(date, 5)));
console.log(formatDate(addDays(date, 14)));
console.log(formatDate(date));
console.log(formatDate(addDays(parseDate("2028-02-28"), 2)));
console.log(formatDate(addDays(parseDate("2027-12-31"), 3)));
