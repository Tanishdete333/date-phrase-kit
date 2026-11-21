
import express from "express";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import {
  resolve,
  parseDate,
  formatDate
} from "./resolver.js";

import { scoreAll } from "./scorer.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const casesPath = join(__dirname, "../data/cases.json");

const cases = JSON.parse(
  readFileSync(casesPath, "utf8")
);

app.get("/cases", (req, res) => {
  res.status(200).json(cases);
});

app.get("/resolve", (req, res) => {
  const { phrase, today } = req.query;

  if (
    typeof phrase !== "string" ||
    !phrase.trim() ||
    typeof today !== "string" ||
    !today
  ) {
    return res.status(400).json({
      error: "Both phrase and today are required"
    });
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(today)) {
    return res.status(400).json({
      error: "Invalid date format. Use YYYY-MM-DD"
    });
  }

  const parsedToday = parseDate(today);

  if (formatDate(parsedToday) !== today) {
    return res.status(400).json({
      error: "Invalid calendar date"
    });
  }

  const result = resolve(phrase, today);

  res.status(200).json({
    phrase,
    today,
    result
  });
});

app.get("/score", (req, res) => {
  const score = scoreAll(cases);

  res.status(200).json(score);
});

const publicPath = join(__dirname, "../public");

app.use(express.static(publicPath));

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
