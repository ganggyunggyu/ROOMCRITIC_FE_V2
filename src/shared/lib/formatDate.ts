export const formatMinute = (inputDateString: string): string => {
  const inputDate: Date = new Date(inputDateString);

  const year: number = inputDate.getFullYear();
  const month: string = String(inputDate.getMonth() + 1).padStart(2, '0');
  const day: string = String(inputDate.getDate()).padStart(2, '0');
  const hours: string = String(inputDate.getHours()).padStart(2, '0');
  const minutes: string = String(inputDate.getMinutes()).padStart(2, '0');

  const formattedDateEnd: string = `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;

  return formattedDateEnd;
};

export const formatMonth = (inputDateString: string): string => {
  const inputDate: Date = new Date(inputDateString);
  const year: number = inputDate.getFullYear();
  const month: string = String(inputDate.getMonth() + 1).padStart(2, '0');

  const formattedMonthEnd: string = `${year}년 ${month}월`;

  return formattedMonthEnd;
};
