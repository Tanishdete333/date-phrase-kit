const MAX_DAYS = 3650;

const numberWords = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10
};

export function parseDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);

  return new Date(Date.UTC(year, month - 1, day));
}

export function formatDate(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function addDays(date, n) {
  const newDate = new Date(date);

  newDate.setUTCDate(newDate.getUTCDate() + n);

  return newDate;
}

function toNumber(text) {
  if (/^\d+$/.test(text)) {
    return Number(text);
  }

  const value = numberWords[text];

  return value === undefined ? null : value;
}

export function resolveDuration(phrase, today) {
  const normalizedPhrase = phrase.toLowerCase().trim();

  const match = normalizedPhrase.match(/^in (\w+) (day|week)s?$/);

  if (!match) {
    return null;
  }

  const amount = toNumber(match[1]);

  if (amount === null) {
    return null;
  }

  const unit = match[2];

  const totalDays = unit === "week" ? amount * 7 : amount;

  if (totalDays > MAX_DAYS) {
    return null;
  }

  const result = addDays(today, totalDays);

  return formatDate(result);
}
const weekdays = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6
};
function getWeekdayFromPhrase(phrase) {
  const match = phrase.match(
    /^(?:on|next|this) (sunday|monday|tuesday|wednesday|thursday|friday|saturday)$/
  );

  if (!match) {
    return null;
  }

  return weekdays[match[1]];
}

export function resolveWeekday(phrase, today) {
  const normalizedPhrase = phrase.toLowerCase().trim();

  const match = normalizedPhrase.match(
    /^(on|next|this) (sunday|monday|tuesday|wednesday|thursday|friday|saturday)$/
  );

  if (!match) {
    return null;
  }

  const prefix = match[1];

  let targetDay = weekdays[match[2]];
  let currentDay = today.getUTCDay();

  if (targetDay === 0) {
    targetDay = 7;
  }

  if (currentDay === 0) {
    currentDay = 7;
  }

  let daysToAdd = targetDay - currentDay;

  if (prefix === "on") {
    if (daysToAdd === 0) {
      return null;
    }

    if (daysToAdd < 0) {
      daysToAdd += 7;
    }
  }

  if (prefix === "this") {
    if (daysToAdd < 0) {
      return null;
    }
  }

  if (prefix === "next") {
    daysToAdd += 7;
  }

  const result = addDays(today, daysToAdd);

  return formatDate(result);
}
export function resolveWeekEnd(phrase, today) {
  const normalizedPhrase = phrase.toLowerCase().trim();

  const match = normalizedPhrase.match(/^end of (this|next) week$/);

  if (!match) {
    return null;
  }

  const weekType = match[1];

  let day = today.getUTCDay();

  if (day === 0) {
    day = 7;
  }

  const daysToFriday = 5 - day;

  if (weekType === "this" && daysToFriday < 0) {
    return null;
  }

  const totalDays = daysToFriday + (weekType === "next" ? 7 : 0);

  const result = addDays(today, totalDays);

  return formatDate(result);
}