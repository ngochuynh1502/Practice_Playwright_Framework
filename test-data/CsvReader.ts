import fs from "fs";
import path from "path";

export function readCsvRecords<T>(
    fileName: string,
): T[] {
    const csvPath = path.resolve(__dirname, fileName);
    const fileContent = fs.readFileSync(csvPath, "utf-8").trim();

    const [headerLine, ...rows] = fileContent.split(/\r?\n/);
    if (!headerLine) {
        return [];
    }

    const headerMapping: Record<string, string> = {
      First_Name: "firstName",
      Last_Name: "lastName",
      Email: "email",
      Age: "age",
      Salary: "salary",
      Department: "department",
    };

    const headers = headerLine
      .split(",")
      .map((header) => header.trim())
      .map((header) => headerMapping[header] ?? header)
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
