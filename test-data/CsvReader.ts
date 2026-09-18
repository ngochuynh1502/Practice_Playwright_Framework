import fs from "fs";
import path from "path";

export function readCsvRecords<T>(
    fileName: string,
    mapping?: Record<string, string>
): T[] {
    const csvPath = path.resolve(__dirname, fileName);
    const fileContent = fs.readFileSync(csvPath, "utf-8").trim();

    const [headerLine, ...rows] = fileContent.split(/\r?\n/);
    if (!headerLine) {
        return [];
    }

    const headers = headerLine
      .split(",")
      .map((header) => header.trim())
      .map((header) => mapping?.[header] ?? header)
      .filter(Boolean);

    return rows
        .filter((row) => row.trim().length > 0)
        .map((row) => {
            const values = row.split(",").map((value) => value.trim());
            return headers.reduce((record, header, index) => {
                record[header] = values[index] ?? "";
                return record;
            }, {} as Record<string, string>) as T;
        });
}
