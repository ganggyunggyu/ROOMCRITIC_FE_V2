import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getAverageGradeByContent } from './api';

export const useAverageGradeByContent = () => {
  const { contentIdParam } = useParams();
  return useQuery({
    queryKey: ['average', contentIdParam],
    queryFn: () => getAverageGradeByContent(contentIdParam),
    select: (data) => data.data,
  });
};
