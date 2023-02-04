import { Parser } from '@json2csv/plainjs';

export interface JsonToCsvAdapter {
    convert(json: Array<Record<string, any>>): string
}

export class JsonToCsv implements JsonToCsvAdapter {
    convert(json: Record<string, any>[]): string {
        const parser = new Parser({});
        const csv = parser.parse(json);
        return csv
    }
}