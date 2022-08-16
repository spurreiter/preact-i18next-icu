export function isDate(val: any): boolean;
export function toNumber(val: any): number | undefined;
export function toDate(val: Date | string | number | any): Date | undefined;
export function toUnit(unit?: string | undefined): string;
export function weekDiff(diff?: {
    [key: string]: any;
    day?: number | undefined;
} | undefined, now?: Date): number;
export function relativeTime(date?: number | Date | undefined, unit?: string | undefined): IValueUnit;
export function nextIntervalMs({ date, unit }: {
    date?: Date | undefined;
    unit?: string | undefined;
}, exact?: boolean | undefined): number;
export function lowerUnit({ value, unit }: IValueUnit): IValueUnit;
export type IValueUnit = import('./types.js').IValueUnit;
