export const email = (email: string): boolean => {
  const emailReg: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailReg.test(email);
};

export const password = (password: string): boolean => {
  const passwordReg: RegExp =
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
  return passwordReg.test(password);
};

export const phoneNumber = (phoneNumber: string): boolean => {
  const phoneNumberReg: RegExp = /^01[0-9]\d{4}\d{4}$/;
  return phoneNumberReg.test(phoneNumber);
};

export const isTrim = (value: string): boolean => {
  return !!value.trim();
};

export const isSame = (value1: string, value2: string): boolean => {
  return value1 === value2;
};
