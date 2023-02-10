"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const csv_stream_1 = tslib_1.__importDefault(require("csv-stream"));
const fastCSV = tslib_1.__importStar(require("fast-csv"));
const core_1 = require("./core");
const OPTIONS = {
    escapeChar: '"',
    enclosedChar: '"',
};
async function main() {
    const filePath = process.argv[2];
    if (!filePath)
        throw Error("Invalid input file path");
    const csvStream = csv_stream_1.default.createStream(OPTIONS);
    const fastCSVStream = fastCSV.format({
        headers: ["id", "json", "is_valid"],
        quoteColumns: [false, true],
        quoteHeaders: false,
    });
    fastCSVStream.pipe(process.stdout).on("end", () => process.exit());
    fs_1.default.createReadStream(path_1.default.join(__dirname, "../" + filePath))
        .pipe(csvStream)
        .on("error", function (err) {
        console.error(err);
    })
        .on("data", function (data) {
        const { id, json } = data;
        const result = (0, core_1.rotateMatrix)(id, JSON.parse(json));
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
