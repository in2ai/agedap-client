export const dateToddMMYYYY = (date: Date): string => {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();
  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }
  return `${day}/${month}/${year}`;
};

export const dateToYYYYMMddwithDashSeparator = (date: Date): string => {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();
  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }
  return `${year}-${month}-${day}`;
};

export const dateTohhmm = (date: Date): string => {
  let hours = '' + date.getUTCHours();
  let minutes = '' + date.getUTCMinutes();
  if (hours.length < 2) {
    hours = '0' + hours;
  }
  if (minutes.length < 2) {
    minutes = '0' + minutes;
  }
  return `${hours}:${minutes}`;
};

export const dateTohhmmss = (date: Date): string => {
  const d = new Date(date);
  let hours = '' + d.getUTCHours();
  let minutes = '' + d.getUTCMinutes();
  let seconds = '' + d.getUTCSeconds();
  if (hours.length < 2) {
    hours = '0' + hours;
  }
  if (minutes.length < 2) {
    minutes = '0' + minutes;
  }
  if (seconds.length < 2) {
    seconds = '0' + seconds;
  }
  return `${hours}:${minutes}:${seconds}`;
};

export const dateToIsoString = (date: Date): string => {
  const d = new Date(date);
  return d.toISOString();
};

export const spanishNowIsoString = (): string => {
  const tzoffset = 1 * 60000; //offset in milliseconds spain
  const localISOTime = new Date(Date.now() - tzoffset).toISOString().slice(0, -1);
  return `${localISOTime}Z`;
};

export const spanishTomorrowIsoString = (): string => {
  const tzoffset = 1 * 60000; //offset in milliseconds spain
  const localISOTime = new Date(Date.now() - tzoffset + 24 * 60000).toISOString().slice(0, -1);
  return `${localISOTime}Z`;
};

export const spanishNowZeroSecondsIsoString = (): string => {
  const tzoffset = 1 * 60000; //offset in milliseconds spain
  const localISOTime = new Date(Date.now() - tzoffset).toISOString().slice(0, -1);
  return `${localISOTime.split('T')[0]}T00:00:00.000Z`;
};

export const numDaysFromNowFromisoStringDate = (isoString: string): number => {
  const d = new Date(isoString);
  const today = new Date();
  return Math.floor((today.getTime() - d.getTime()) / (1000 * 3600 * 24));
};

export const isoStringToddMMYYYY = (isoString: string): string => {
  if (!isoString) {
    return '';
  }

  const tzoffset = new Date().getTimezoneOffset() * 60000;
  const date = new Date(isoString);
  const timestamp = date.getTime();
  const localDate = new Date(timestamp - tzoffset);
  return dateToddMMYYYY(localDate);
};

export const isoStringTohhmm = (isoString: string): string => {
  const tzoffset = new Date().getTimezoneOffset() * 60000;
  const date = new Date(isoString);
  const timestamp = date.getTime();
  const localDate = new Date(timestamp - tzoffset);
  return dateTohhmm(localDate);
};

export const isoStringToddMMYYYYhhmm = (isoString: string): string => {
  const tzoffset = new Date().getTimezoneOffset() * 60000;
  const date = new Date(isoString);
  const timestamp = date.getTime();
  const localDate = new Date(timestamp - tzoffset);
  return `${dateToddMMYYYY(localDate)} ${dateTohhmm(localDate)}`;
};

export const isoStringToddMMYYYYhhmmss = (isoString: string): string => {
  const tzoffset = new Date().getTimezoneOffset() * 60000;
  const date = new Date(isoString);
  const timestamp = date.getTime();
  const localDate = new Date(timestamp - tzoffset);
  return `${dateToddMMYYYY(localDate)} ${dateTohhmmss(localDate)}`;
};

export const addNumDaysToDate = (date: Date, numDays: number): Date => {
  const d = new Date(date);
  d.setDate(d.getDate() + numDays);
  return d;
};

export const substractNumDaysToDate = (date: Date, numDays: number): Date => {
  const d = new Date(date);
  d.setDate(d.getDate() - numDays);
  return d;
};

export const toTwoDigits = (num: number): string => {
  return num < 10 ? `0${num}` : `${num}`;
};

export const toTwoDecimals = (num: number): number => {
  return Math.round(num * 100) / 100;
};

export const getDaysInMonth = (month: number, year: number): Date[] => {
  const date = new Date(Date.UTC(year, month, 1));
  const days = [];
  while (date.getUTCMonth() === month) {
    days.push(new Date(date));
    date.setUTCDate(date.getUTCDate() + 1);
  }
  return days;
};

export const capitalizeFirstLetterOfString = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Temp for fake data
export const generateRandomDate = () => {
  const from = new Date(2023, 0, 1);
  const to = new Date();

  return new Date(from.getTime() + Math.random() * (to.getTime() - from.getTime()));
};

export const generateRandomDateFromTo = (from: Date, to: Date) => {
  return new Date(from.getTime() + Math.random() * (to.getTime() - from.getTime()));
};

export const noSecondsTime = (time: string) => {
  return time.split(':').slice(0, 2).join(':');
};

export const timestampTohhmm = (timestamp: number) => {
  const date = new Date(timestamp);
  console.log('date', date);
  return dateTohhmm(date);
};

export const removeEmptyStringsFromArray = (array: string[]) => {
  return array.filter((item) => item);
};

export const getNumDaysFromNow = (isoStr: string): number => {
  const date = new Date(isoStr);
  const now = new Date();
  return Math.floor((now.getTime() - date.getTime()) / (1000 * 3600 * 24));
};

export const getNumMonthsFromNow = (isoStr: string) => {
  const date = new Date(isoStr);
  const now = new Date();
  return now.getMonth() - date.getMonth() + 12 * (now.getFullYear() - date.getFullYear());
};

export const capitalizeFirst = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getImageTypeFromUrl = (url: string) => {
  const fileUrl = url.split('?')[0];
  const dotSeparationArray = fileUrl.split('.');
  const ext = dotSeparationArray[dotSeparationArray.length - 1];

  return ext === 'png'
    ? 'image/webp'
    : ext === 'svg'
      ? 'image/svg+xml'
      : ext === 'webp'
        ? 'image/webp'
        : `image/${ext}`;
};

export const getMediaExtension = (url: string) => {
  const fileUrl = url.split('?')[0];
  const dotSeparationArray = fileUrl.split('.');
  return '.' + dotSeparationArray[dotSeparationArray.length - 1];
};

export const validateEmail = (email: string) => {
  if (email === '') return true;
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const noAccentsAndLowerCase = (str: string): string => {
  if (!str) {
    return '';
  }
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const toTwoDecimalsString = (num: number): string => {
  return num.toFixed(2);
};

export const lighterColor = (color: string, percent: number) => {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const B = ((num >> 8) & 0x00ff) + amt;
  const G = (num & 0x0000ff) + amt;
  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
      (G < 255 ? (G < 1 ? 0 : G) : 255)
    )
      .toString(16)
      .slice(1)
  );
};

export const addZuluIndication = (isoString: string) => {
  return isoString.includes('Z') ? isoString : `${isoString}Z`;
};

export const removeZuluIndication = (isoString: string) => {
  return isoString.replace('Z', '');
};
