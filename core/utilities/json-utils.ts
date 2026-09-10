import * as fs from 'fs';
import * as path from 'path';

export class JsonUtils {

    static readJsonFile<T = any>(relativePath: string): T {
        const absolutePath = path.resolve(process.cwd(), relativePath);
        try {
            const fileContent = fs.readFileSync(absolutePath, 'utf-8');
            return JSON.parse(fileContent);
        } catch (error) {
            console.error(`Failed to read json file at ${absolutePath}:`, error);
            throw error;
        }
    }

    static writeJsonFile(relativePath: string, data: any): void {
        const absolutePath = path.resolve(process.cwd(), relativePath);
        try {
            const jsonContent = JSON.stringify(data, null, 2);
            fs.writeFileSync(absolutePath, jsonContent, 'utf-8');
        } catch (error) {
            console.error(`Failed to read json file at ${absolutePath}:`, error);
            throw error;
        }
    }

    static exists(relativePath: string): boolean {
        const absolutePath = path.resolve(process.cwd(), relativePath);
        return fs.existsSync(absolutePath);
    }
}
