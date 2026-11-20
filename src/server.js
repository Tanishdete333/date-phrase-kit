
import express from "express";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found"
  });
});