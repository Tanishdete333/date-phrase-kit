import { resolve } from "./resolver.js";

export function classify(testCase, result) {
  const expected = testCase.expected;

  if (expected === null) {
    return result === null ? "correct_refusal" : "false_guess";
  }

  if (result === null) {
    return "missed";
  }

  if (
    result === expected ||
    (testCase.acceptable ?? []).includes(result)
  ) {
    return "correct_date";
  }

  return "wrong_date";
}

export function scoreAll(cases) {
  const byCategory = {};
  const failures = [];

  const overall = {
    total: 0,
    correct_date: 0,
    correct_refusal: 0,
    missed: 0,
    wrong_date: 0,
    false_guess: 0
  };

  for (const testCase of cases) {
    const result = resolve(testCase.phrase, testCase.today);
    const label = classify(testCase, result);

    if (!byCategory[testCase.category]) {
      byCategory[testCase.category] = {
        total: 0,
        correct_date: 0,
        correct_refusal: 0,
        missed: 0,
        wrong_date: 0,
        false_guess: 0
      };
    }

    byCategory[testCase.category].total++;
    byCategory[testCase.category][label]++;

    overall.total++;
    overall[label]++;

    if (label !== "correct_date" && label !== "correct_refusal") {
      failures.push({
        id: testCase.id,
        phrase: testCase.phrase,
        category: testCase.category,
        expected: testCase.expected,
        actual: result,
        label
      });
    }
  }

  for (const category of Object.values(byCategory)) {
    category.percentage = Number(
      (
        ((category.correct_date + category.correct_refusal) /
          category.total) *
        100
      ).toFixed(2)
    );
  }

  overall.percentage = Number(
    (
      ((overall.correct_date + overall.correct_refusal) /
        overall.total) *
      100
    ).toFixed(2)
  );

  return {
    byCategory,
    failures,
    overall
  };
}