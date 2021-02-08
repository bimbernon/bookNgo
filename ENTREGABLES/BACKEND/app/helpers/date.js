"use strict";

function addDateDays(date, dias) {
  date.setDate(date.getDate() + dias);

  return date;
}

function dateFormatted(date) {
  return (
    formatDayDate(date.getDay()) +
    "/" +
    formatMonthDate(date.getMonth()) +
    "/" +
    date.getFullYear()
  );
}

function formatDayDate(date) {
  if (date.getDay() <= 10) {
    return "0" + date.getDay();
  }
  return date.getDay();
}

function formatMonthDate(date) {
  if (date.getMonth() <= 10) {
    return "0" + date.getMonth();
  }
}

module.exports = {
  addDateDays,
  dateFormatted,
  formatDayDate,
  formatMonthDate,
};
