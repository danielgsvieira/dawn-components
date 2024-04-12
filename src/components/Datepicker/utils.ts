import {
  createDate,
  DawnDate,
  getNumberOfDaysByMonth,
} from '../../utils/DateUtils';

function fillSequentialNumberArray(start: number, quantity: number): number[] {
  const result: number[] = [];

  for (let i = 0; i < quantity; i += 1) {
    result.push(start + i);
  }

  return result;
}

function getPreviousMonthDaysArray(month: number, year: number): DawnDate[] {
  const monthDate = createDate({ day: 1, month, year });
  const previousMonthDate =
    month > 1
      ? createDate({ day: 1, month: month - 1, year })
      : createDate({ day: 1, month: 12, year: year - 1 });

  const firstDayWeekDay = monthDate.getWeekday();
  const numberOfDaysToGet = firstDayWeekDay !== 7 ? firstDayWeekDay : 0;
  const previousMonthNumberOfDays = getNumberOfDaysByMonth(
    previousMonthDate.getMonth(),
    previousMonthDate.getYear(),
  );

  const daysNumberArray = fillSequentialNumberArray(
    previousMonthNumberOfDays - numberOfDaysToGet + 1,
    numberOfDaysToGet,
  );

  return daysNumberArray.map((el) =>
    createDate({
      day: el,
      month: previousMonthDate.getMonth(),
      year: previousMonthDate.getYear(),
    }),
  );
}

function getNextMonthDaysArray(month: number, year: number): DawnDate[] {
  const lastDayOfMonth = getNumberOfDaysByMonth(month, year);
  const monthDate = createDate({ day: lastDayOfMonth, month, year });

  const lastDayWeekDay = monthDate.getWeekday();
  const numberOfDaysToGet = lastDayWeekDay < 7 ? 6 - lastDayWeekDay : 6;

  const nextMonthDate =
    month < 12
      ? createDate({
          day: getNumberOfDaysByMonth(month + 1, year),
          month: month + 1,
          year,
        })
      : createDate({
          day: getNumberOfDaysByMonth(1, year + 1),
          month: 1,
          year: year + 1,
        });
  const daysNumberArray = fillSequentialNumberArray(1, numberOfDaysToGet);

  return daysNumberArray.map((el) =>
    createDate({
      day: el,
      month: nextMonthDate.getMonth(),
      year: nextMonthDate.getYear(),
    }),
  );
}

function getDaysArray(month: number, year: number): DawnDate[] {
  const previousMonthDays = getPreviousMonthDaysArray(month, year);

  const currentMonthNumberOfDays = getNumberOfDaysByMonth(month, year);
  const currentMonthDaysNumberArray = fillSequentialNumberArray(
    1,
    currentMonthNumberOfDays,
  );
  const currentMonthDays = currentMonthDaysNumberArray.map((el) =>
    createDate({
      day: el,
      month,
      year,
    }),
  );

  const nextMonthDays = getNextMonthDaysArray(month, year);

  return [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
}

export { getDaysArray };
