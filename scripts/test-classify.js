import { classify } from "../src/scorer.js";

const tests = [
  {
    name: "Correct date",
    testCase: { expected: "2026-11-20" },
    result: "2026-11-20"
  },
  {
    name: "Correct refusal",
    testCase: { expected: null },
    result: null
  },
  {
    name: "Missed",
    testCase: { expected: "2026-11-20" },
    result: null
  },
  {
    name: "Wrong date",
    testCase: { expected: "2026-11-20" },
    result: "2026-11-21"
  },
  {
    name: "False guess",
    testCase: { expected: null },
    result: "2026-11-20"
  },
  {
    name: "Acceptable date",
    testCase: {
      expected: "2026-11-20",
      acceptable: ["2026-11-24"]
    },
    result: "2026-11-24"
  }
];

for (const test of tests) {
  console.log(`${test.name} => ${classify(test.testCase, test.result)}`);
}