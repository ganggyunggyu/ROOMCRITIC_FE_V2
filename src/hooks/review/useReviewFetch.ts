import { useQuery } from '@tanstack/react-query';
import axiosConfig from '../../api/axiosConfig';

const fetchLatestReviews = async () => {
  const result = await axiosConfig.get('review/latest');
  return result;
};
const fetchTvContentReviews = async () => {
  try {
    const result = await axiosConfig.get('review/tv');
    return result;
  } catch (error) {
    console.log(error);
  }
};
const fetchMovieContentReviews = async () => {
  try {
    const result = await axiosConfig.get('review/movie');
    return result;
  } catch (error) {
    console.log(error);
  }
};

const useReviewFetch = () => {
  const latestReviewsQuery = useQuery({
    queryKey: ['latestReviews'],
    queryFn: fetchLatestReviews,
  });

  const tvContentReviewsQuery = useQuery({
    queryKey: ['tvReviews'],
    queryFn: fetchTvContentReviews,
  });

  const movieContentReviewsQuery = useQuery({
    queryKey: ['movieReviews'],
    queryFn: fetchMovieContentReviews,
  });

  return {
    latestReviewsQuery,
    movieContentReviewsQuery,
    tvContentReviewsQuery,
  };
};

export default useReviewFetch;
