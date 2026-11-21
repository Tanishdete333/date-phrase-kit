# Date Phrase Kit

## What it is

Different readings of relative date phrases like "end of next week" exist. Date Phrase Kit is a small project for testing how these phrases resolve to calendar dates. It uses a labeled dataset, a date resolver, a scorer, an API, and a simple web page to score a resolver against labeled cases and report accuracy per category. It picks one documented interpretation rather than claiming that interpretation is universal.

## What it is NOT

- It is not the startup's engine. It is my own date phrase resolver.
- It does not detect commitments.
- It does not integrate with Slack.
- It does not use a database.
- It only covers relative date phrases and their resolution to calendar dates.

## How to run

Tested on Node.js `v24.14.0`.

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

Open the application at:

http://localhost:3000

Run automated tests:

```bash
npm test
```

## Convention

The resolver follows these conventions:

- **Weeks:** A week runs from Monday to Sunday.
- **End of this week:** Resolves to Friday of the current week. If today is Saturday or Sunday, it returns `null`.
- **End of next week:** Resolves to Friday of the following Monday–Sunday week, including when today is Saturday or Sunday.
- **This weekday:** `this <weekday>` returns that weekday in the current week, including today. If that weekday has already passed, it returns `null`.
- **Next weekday:** `next <weekday>` refers to that weekday in the following Monday–Sunday week. However, phrases such as "next Tuesday" can have another interpretation, which is a known limitation.
- **Bare weekday:** A bare `on <weekday>` phrase on that same weekday returns `null`, because it could refer to today or the following week.
- **Weekend examples:** On Saturday, 21 November 2026, "end of this week" returns `null`, while "end of next week" returns `2026-11-27`.
- **Ambiguous or unsupported phrases:** `expected: null` means the dataset expects the resolver to refuse to guess rather than return a date.
- **End of the month:** Resolves to the last calendar day of the current month. If today is already the last day, it returns today's date.

For example, under this project's convention, "end of next week" on Tuesday, 17 November 2026 resolves to Friday, 27 November 2026. This is a documented interpretation, not a claim that every product or person uses the same interpretation.

## Score

| Category | Correct | Total | Percent |
|---|---:|---:|---:|
| this_week | 4 | 4 | 100% |
| next_week | 4 | 4 | 100% |
| weekday | 5 | 5 | 100% |
| duration | 5 | 5 | 100% |
| end_of_month | 4 | 4 | 100% |
| time_of_day | 3 | 3 | 100% |
| ambiguous | 5 | 5 | 100% |
| **Overall** | **30** | **30** | **100%** |

The final result consists of 24 correctly resolved dates and 6 correctly refused phrases. A refusal counts as correct when the labeled dataset expects `null`.

**Limitations of this score:**

- The 100% score is based on my own 30 test cases.
- I wrote the resolver patterns after seeing these examples, so the score may overstate its performance on unfamiliar phrases.
- This score does not establish general natural-language accuracy.

First run: 24/30 (six phrase variants missed); I then widened the patterns.

## Real Readywhen Results

I manually tested the following phrase using Readywhen. I recall seeing the same result twice.

| Phrase | Sent on | Readywhen gave | My expectation | Verified |
|---|---|---|---|---|
| "I'll send the slides by end of next week" | Tue 17 Nov 2026 | Tue 24 Nov 2026 (twice) | Fri 27 Nov 2026 | Manual test by me |

Verified means I ran the phrase myself and saw the result; no screenshot was retained.

I expected Fri 27 Nov, but some people may read "end of next week" differently. I'd like to understand which reading the product intends.

These results record my own observation. They are not a comprehensive evaluation of Readywhen, and one phrase is not enough to establish how the product interprets date phrases generally.

## Known Limitations

- Number words in duration phrases are supported only from one to ten.
- Durations greater than 3650 days return `null`.
- "End of this week" returns `null` when today is Saturday or Sunday.
- "Next Tuesday" can have more than one interpretation. This kit uses the following Monday–Sunday week.
- A bare weekday phrase such as "on Friday" returns `null` when today is Friday, because it could refer to today or the following week.
- Only the phrase patterns explicitly implemented in the resolver are supported. Unrecognized phrases return `null`.
- Dates only, no times. "By 5 PM" returns today's date and the time is ignored.
- The resolver supports English phrases only.
- The 100% score is based on the project's own 30 test cases. The patterns were developed after seeing those examples, so this score does not establish general natural-language accuracy.

## Live Demo

Coming after deployment.