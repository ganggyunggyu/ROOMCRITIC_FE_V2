export const getGradeText = (grade: number) => {
  switch (grade) {
    case 0.5:
      return '최악이에요';
    case 1:
      return '싫어요';
    case 1.5:
      return '재미없어요';
    case 2:
      return '별로에요';
    case 2.5:
      return '부족해요';
    case 3:
      return '보통이에요';
    case 3.5:
      return '볼만해요';
    case 4:
      return '재미있어요';
    case 4.5:
      return '훌륭해요!';
    case 5:
      return '최고에요!';
    default:
      return '';
  }
};
