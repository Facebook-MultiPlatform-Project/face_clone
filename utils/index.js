import dayjs from 'dayjs';

function isPlural(n) {
  return n > 1 ? 's' : '';
}

export function getTimeDisplay(createdAt) {
  let secDif = dayjs(Date.now()).diff(dayjs(createdAt), 'second');
  const years = Math.floor(secDif / (365 * 24 * 60 * 60));
  if (years > 0) return `${years} year${isPlural(years)} ago`;
  secDif = secDif - years * 365 * 24 * 60 * 60;
  const months = Math.floor(secDif / (30 * 24 * 60 * 60));
  if (months > 0) return `${months} month${isPlural(months)} ago`;
  secDif = secDif - months * 30 * 24 * 60 * 60;
  const weeks = Math.floor(secDif / (7 * 24 * 60 * 60));
  if (weeks > 0) return `${weeks} week${isPlural(weeks)} ago`;
  secDif = secDif - weeks * 7 * 24 * 60 * 60;
  const days = Math.floor(secDif / (24 * 60 * 60));
  if (days > 0) return `${days} day${isPlural(days)} ago`;
  secDif = secDif - days * 24 * 60 * 60;
  const hours = Math.floor(secDif / 60 / 60);
  if (hours > 0) return `${hours} hour${isPlural(hours)} ago`;
  secDif = secDif - hours * 60 * 60;
  const min = Math.floor(secDif / 60);
  if (min > 0) return `${min} minute${isPlural(min)} ago`;
  secDif = secDif - min * 60;
  const sec = Math.floor(secDif);
  if (sec > 0) return `${sec} second${isPlural(sec)} ago`;
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string") {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time);
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), "/");
      }
    }

    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    return value.toString().padStart(2, "0");
  });
  return time_str;
}
