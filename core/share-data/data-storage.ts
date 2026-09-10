export class DataStorage {
    private static _data: Record<string, any> = {};

    static initializeDataStorage(): void {
        DataStorage._data = {};
    }

    static setData(key: string, value: any): void {
        DataStorage._data[key] = value;
    }

    static getData<T = any>(key: string): T | null {
        if (key in DataStorage._data) {
            return DataStorage._data[key] as T;
        } else {
            return null;
        }
    }

    static clearData(): void {
        DataStorage._data = {};
    }
}
