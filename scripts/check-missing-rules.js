import { resolve } from "../src/resolver.js";

console.log(resolve("end of the month", "2026-12-31"));
console.log(resolve("by EOD", "2026-11-17"));