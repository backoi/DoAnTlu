import moment from 'moment';
export const formatToVietnamTime = (dateTime:any, format = 'YYYY-MM-DD HH:mm:ss') => {
  return moment.utc(dateTime).utcOffset(7).format(format);
};
export const validateEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};
