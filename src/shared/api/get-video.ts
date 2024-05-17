import { TMDB_TOKEN } from '../../config/env-config';

const option = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: TMDB_TOKEN,
  },
};

const getVideo = async (type: string, id: number) => {
  const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?language=ko-KR`, {
    ...option,
    signal: AbortSignal.timeout(1_000),
  });

  if (!response.ok) {
    throw new Error('네트워크 통신 에러');
  }
  const data = await response.json();
  if (data.results.length === 0) throw new Error('비디오 정보 없음');

  return data;
};

export default getVideo;
