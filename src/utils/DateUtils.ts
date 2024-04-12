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

const MonthsDaysNumberMap: Map<number, number> = new Map<number, number>([
  [1, 31],
  [2, 29],
  [3, 31],
  [4, 30],
  [5, 31],
  [6, 30],
  [7, 31],
  [8, 31],
  [9, 30],
  [10, 31],
  [11, 30],
  [12, 31],
]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isCreateDateObject(obj: any): obj is DateObject {
  return (
    typeof obj.year === 'number' &&
    typeof obj.month === 'number' &&
    typeof obj.day === 'number'
  );
}

function isLeapYear(year: number): boolean {
  return year % 400 === 0 || year % 100 === 0 || year % 4 === 0;
}

function getNumberOfDaysByMonth(month: number, year: number): number {
  if (month === 2) {
    return isLeapYear(year) ? 29 : 28;
  }

  const numberOfDays = MonthsDaysNumberMap.get(month);

  if (numberOfDays === undefined) {
    throw new Error(`Invalid month value: ${month}`);
  }

  return numberOfDays;
}

function isValidDateObject(obj: DateObject): boolean {
  if (obj.month < 1 || obj.month > 12 || obj.day < 1 || obj.day > 31) {
    return false;
  }

  const numberOfDays = getNumberOfDaysByMonth(obj.month, obj.year);

  return obj.day <= numberOfDays;
}

function isValidDateString(str: string): boolean {
  const [yearStr, monthStr, dayStr] = str.split('-');

  const year = Number.parseInt(yearStr);
  const month = Number.parseInt(monthStr);
  const day = Number.parseInt(dayStr);

  if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
    return false;
  }

  return isValidDateObject({ year, month, day });
}

function createDateObject(date: Date): DawnDate {
  return {
    date,
    getDay(): number {
      return this.date.getUTCDate();
    },
    getMonth(): number {
      return this.date.getUTCMonth() + 1;
    },
    getYear(): number {
      return this.date.getUTCFullYear();
    },
    getWeekday(): number {
      return this.date.getUTCDay() + 1;
    },
    toObject(): DateObject {
      return {
        year: this.getYear(),
        month: this.getMonth(),
        day: this.getDay(),
      };
    },
    toISODate(): string {
      const yearStr = this.getYear().toString().padStart(4, '0');
      const monthStr = this.getMonth().toString().padStart(2, '0');
      const dayStr = this.getDay().toString().padStart(2, '0');

      return `${yearStr}-${monthStr}-${dayStr}`;
    },
  };
}

function createDate(value?: string | DateObject | null): DawnDate {
  if (value === undefined || value === null) {
    return createDateObject(new Date());
  }

  if (typeof value === 'string' && !isValidDateString(value)) {
    throw new Error(`'${value}' is not in yyyy/mm/dd format`);
  }

  if (isCreateDateObject(value) && !isValidDateObject(value)) {
    throw new Error(`'${value}' is not a valid date object`);
  }

  return createDateObject(
    typeof value === 'string'
      ? new Date(value)
      : new Date(value.year, value.month - 1, value.day),
  );
}

export type { DateObject, DawnDate };

export {
  createDate,
  getNumberOfDaysByMonth,
  isLeapYear,
  isValidDateObject,
  isValidDateString,
};
