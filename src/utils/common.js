import dayjs from 'dayjs';

const capitalizeFirstLetter = (string) => string.charAt(0)
  .toUpperCase() + string.slice(1);

const isFuturePoint = (dateFrom) => dateFrom && (dayjs().isSame(dateFrom, 'D') || dayjs().isBefore(dateFrom, 'D'));

export {capitalizeFirstLetter, isFuturePoint };
