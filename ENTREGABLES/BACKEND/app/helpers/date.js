"use strict";

function addDateDays(date, dias) {
  date.setDate(date.getDate() + dias);

  return date;
}

function dateFormatted(date, character) {
  console.log(date.getMonth());
  return (
    date.getFullYear() +
    character +
    formatMonthDate(date) +
    character +
    formatDayDate(date)
  );
}

function formatDayDate(date) {
  if (date.getDate() < 10) {
    return "0" + date.getDate();
  }
  return date.getDate();
}

function formatMonthDate(date) {
  if (date.getMonth() < 10) {
    return "0" + (date.getMonth() + 1);
  }
}

module.exports = {
  addDateDays,
  dateFormatted,
  formatDayDate,
  formatMonthDate,
};
