
import test from "node:test";
import assert from "node:assert/strict";
import { resolve } from "../src/resolver.js";

test('"end of next week" resolves correctly', () => {
  assert.equal(
    resolve("end of next week", "2026-11-17"),
    "2026-11-27"
  );
});

test("unknown phrase returns null", () => {
  assert.equal(
    resolve("unknown phrase", "2026-11-17"),
    null
  );
});

test("Friday today resolves correctly", () => {
  assert.equal(
    resolve("on Friday", "2026-11-20"),
    null
  );
});

test("end of month on the 31st resolves correctly", () => {
  assert.equal(
    resolve("end of month", "2026-12-15"),
    "2026-12-31"
  );
});

test("leap year February resolves correctly", () => {
  assert.equal(
    resolve("by the last day of February", "2028-02-10"),
    "2028-02-29"
  );
});

test("late December duration crosses into next year", () => {
  assert.equal(
    resolve("in 3 days", "2026-12-30"),
    "2027-01-02"
  );
});
