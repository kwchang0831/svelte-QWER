import { dateConfig } from '$config/site';

export const lastUpdatedStr = (updatedTime: string) => {
  // In minutes
  let lastUpdated = (new Date().getTime() - new Date(updatedTime).getTime()) / 60000;

  let cur = Math.round(lastUpdated);
  if (cur === 0) {
    return 'just now';
  }
  if (cur < 60) {
    return `${cur} minute${cur > 1 ? 's' : ''} ago`;
  }

  // In hours
  lastUpdated = lastUpdated / 60;
  cur = Math.round(lastUpdated);
  if (cur < 24) {
    return `${cur} hour${cur > 1 ? 's' : ''} ago`;
  }

  // In days
  lastUpdated = lastUpdated / 24;
  cur = Math.round(lastUpdated);

  return `${cur} day${cur > 1 ? 's' : ''} ago`;
};

export const defaultPublishedStr = (publishedTime: string) => {
  return new Date(publishedTime).toLocaleString(
    dateConfig.toPublishedString.locales,
    dateConfig.toPublishedString.options,
  );
};

export const defaultUpdatedStr = (updatedTime: string) => {
  return new Date(updatedTime).toLocaleString(dateConfig.toUpdatedString.locales, dateConfig.toUpdatedString.options);
};

export const dateTimeLocaleStr = (dateTime: string, locales: string, options: Intl.DateTimeFormatOptions) => {
  return new Date(dateTime).toLocaleString(locales, options);
};
