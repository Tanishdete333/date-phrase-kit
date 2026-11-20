
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
