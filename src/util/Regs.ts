export const emailRegTest = (email) => {
  const emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailReg.test(email);
};
export const PasswordRegTest = (password) => {
  const passwordReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
  return passwordReg.test(password);
};
// export const phoneNumberRegTest = (phoneNumber) => {
//   const phoneNumberReg = /^01[0-9]-\d{4}-\d{4}$/;
//   return phoneNumberReg.test(phoneNumber);
// };
export const phoneNumberRegTest = (phoneNumber) => {
  const phoneNumberReg = /^01[0-9]\d{4}\d{4}$/;
  return phoneNumberReg.test(phoneNumber);
};
export const isTrim = (value) => {
  return !!value.trim();
};
export const isSame = (value1, value2) => {
  if (value1 === value2) {
    return true;
  }
  return false;
};

export const formatDateWithTime = (inputDateString) => {
  const inputDate = new Date(inputDateString);

  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, '0');
  const day = String(inputDate.getDate()).padStart(2, '0');
  const hours = String(inputDate.getHours()).padStart(2, '0');
  const minutes = String(inputDate.getMinutes()).padStart(2, '0');

  const formattedDateEnd = `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
  const formattedMonthEnd = `${year}년 ${month}월`;
  return { formattedDateEnd, formattedMonthEnd };
};
