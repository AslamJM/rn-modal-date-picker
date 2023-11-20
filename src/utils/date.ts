const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const weekDays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const monthsShort = months.map((m) => m.slice(0, 3));

export const getMonths = () => months;
export const getMonthName = (m: number) => months[m];

export const getWeekDays = () => weekDays;
export const getWeekDaysShort = () => weekDays.map((d) => d.slice(0, 3));

export const getDateMonth = (date: Date) => date.getMonth();
export const getDateYear = (date: Date) => date.getFullYear();

export const generateYearRange = (
  year: number,
  direction: 'up' | 'down' | null
) => {
  if (direction === 'up') {
    let startYear = Math.max(0, year - 19);
    return Array.from({ length: 20 }, (_, i) => startYear + i);
  }

  if (direction === 'down') {
    let startYear = year;
    return Array.from({ length: 20 }, (_, i) => startYear + i);
  }
  let startYear = Math.max(0, year - 10);
  return Array.from({ length: 20 }, (_, i) => startYear + i);
};

export const daysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();

export const firstDayOftheMonth = (year: number, month: number) =>
  new Date(year, month, 0).getDay();

export const sameDay = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear === date2.getFullYear &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

// const getCanderMonthDays = (year: number, month: number) => {
//   const daysthisMonth = daysInMonth(year, month);
//   const firstDayOffset = new Date(year, month, 1).getDay();
// };
