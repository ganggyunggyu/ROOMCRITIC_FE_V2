export const emailRegTest = (email: string): boolean => {
  const emailReg: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailReg.test(email);
};

export const passwordRegTest = (password: string): boolean => {
  const passwordReg: RegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
  return passwordReg.test(password);
};

export const phoneNumberRegTest = (phoneNumber: string): boolean => {
  const phoneNumberReg: RegExp = /^01[0-9]\d{4}\d{4}$/;
  return phoneNumberReg.test(phoneNumber);
};

export const isTrim = (value: string): boolean => {
  return !!value.trim();
};

export const isSame = (value1: string, value2: string): boolean => {
  return value1 === value2;
};

export const formatDateWithTime = (
  inputDateString: string,
): { formattedDateEnd: string; formattedMonthEnd: string } => {
  const inputDate: Date = new Date(inputDateString);

  const year: number = inputDate.getFullYear();
  const month: string = String(inputDate.getMonth() + 1).padStart(2, '0');
  const day: string = String(inputDate.getDate()).padStart(2, '0');
  const hours: string = String(inputDate.getHours()).padStart(2, '0');
  const minutes: string = String(inputDate.getMinutes()).padStart(2, '0');

  const formattedDateEnd: string = `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
  const formattedMonthEnd: string = `${year}년 ${month}월`;

  return { formattedDateEnd, formattedMonthEnd };
};
