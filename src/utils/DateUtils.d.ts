type DawnDate = {
    date: Date;
    /**
     * Get the year
     */
    getYear: () => number;
    /**
     * Get the month (1-12)
     */
    getMonth: () => number;
    /**
     * Get the day of the month (1-30ish).
     */
    getDay: () => number;
    /**
     * Get the day of the week. 1 is Monday and 7 is Sunday
     */
    getWeekday: () => number;
    /**
     * Returns an object of type { year: number; month: number; day: number; }
     */
    toObject: () => DateObject;
    /**
     * Return a formated dat string (yyyy-mm-dd)
     */
    toISODate: () => string;
};
type DateObject = {
    day: number;
    month: number;
    year: number;
};
declare function isLeapYear(year: number): boolean;
declare function getNumberOfDaysByMonth(month: number, year: number): number;
declare function isValidDateObject(obj: DateObject): boolean;
declare function isValidDateString(str: string): boolean;
declare function createDate(value?: string | DateObject | null): DawnDate;
export type { DateObject, DawnDate };
export { createDate, getNumberOfDaysByMonth, isLeapYear, isValidDateObject, isValidDateString, };
