import fs from "fs";
import path from "path";
import csv from "csv-stream";
import * as fastCSV from "fast-csv";
import { rotateMatrix } from "./core";

const OPTIONS = {
  escapeChar: '"',
  enclosedChar: '"',
};
async function main() {
  const filePath = process.argv[2];
  if (!filePath) throw Error("Invalid input file path");

  const csvStream = csv.createStream(OPTIONS);
  const fastCSVStream = fastCSV.format({
    headers: ["id", "json", "is_valid"],
    quoteColumns: [false, true],
    quoteHeaders: false,
  });

  fastCSVStream.pipe(process.stdout).on("end", () => process.exit());

  fs.createReadStream(path.join(__dirname, "../" + filePath))
    .pipe(csvStream)
    .on("error", function (err) {
      console.error(err);
    })
    .on("data", function (data) {
      const { id, json } = data;
      const result = rotateMatrix(id, JSON.parse(json));
      fastCSVStream.write(result);
    })
    .on("end", function () {
      fastCSVStream.end();
    });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
