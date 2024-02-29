import axios from 'axios';
import { TMDMAPIKEY } from '../env-config';

const tmdbAxiosConfig = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: TMDMAPIKEY,
    language: 'ko-KR',
  },
});

export default tmdbAxiosConfig;
