import YouTube, { YouTubeProps } from 'react-youtube';
import getVideo from '../../shared/api/get-video';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export function ContentVideo({ type, id }) {
  const [hide, setHide] = useState('');
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.playVideo();
    event.target.mute();
  };
  const onError: YouTubeProps['onError'] = (event) => {
    event.target.stopVideo();
    if (event.target.getPlayerState() === -1) setHide('hidden');
  };

  const videoQuery = useQuery({
    queryKey: ['video', type, id],
    queryFn: () => getVideo(type, id),
  });

  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };
  if (videoQuery.isLoading)
    return (
      <div className='video-container flex items-center justify-center w-full h-full'>
        <p className='absolute top-1/2'>...Video Loading</p>
      </div>
    );

  if (videoQuery.isSuccess) {
    const findTrailer = () => {
      return videoQuery.data.results.find((item) => item.type === 'Trailer');
    };
    const item = findTrailer();
    console.log(item);
    if (!item) return <div></div>;
    return (
      <article className={`video-container ${hide}`}>
        <YouTube
          className='h-full'
          videoId={item.key ? item.key : 'key'}
          opts={opts}
          onReady={onPlayerReady}
          onError={onError}
        />
      </article>
    );
  }
  return <div></div>;
}
