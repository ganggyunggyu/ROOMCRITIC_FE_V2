import React from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import getVideo from '../../shared/api/get-video';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../../shared/ui';
export function ContentVideo({ type, id }) {
  const [hide, setHide] = React.useState('');
  const [showNoVideoMessage, setShowNoVideoMessage] = React.useState(false);
  const [fadeOut, setFadeOut] = React.useState(false);
  const [videoLoaded, setVideoLoaded] = React.useState(false); // 비디오 로딩 여부 상태 추가
  const [isPending, startTeansition] = React.useTransition();

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.playVideo();
    event.target.mute();
    if (videoLoaded === false) event.target.stopVideo();
  };
  // const togglePlayer: YouTubeProps['onError'] = (event) => {
  //   event.target.stopVideo();
  // };

  const onError: YouTubeProps['onError'] = (event) => {
    event.target.stopVideo();
    if (event.target.getPlayerState() === -1) setHide('hidden');
  };

  const videoQuery = useQuery({
    queryKey: ['video', type, id],
    queryFn: () => getVideo(type, id),
    retry: 1,
  });

  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };
  const videoHendler = () => {
    setVideoLoaded(!videoLoaded);
    // togglePlayer(event);
  };

  React.useEffect(() => {
    if (!videoQuery.isLoading && !videoQuery.isSuccess) {
      setShowNoVideoMessage(true);
      const timer = setTimeout(() => {
        setFadeOut(true);

        setTimeout(() => {
          setShowNoVideoMessage(false);
          setFadeOut(false);
        }, 2000);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [videoQuery.isLoading, videoQuery.isSuccess]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      startTeansition(() => {
        setVideoLoaded(true); // 비디오 요청 성공 시 loaded 클래스 추가
      });
    }, 450);
    if (videoQuery.isSuccess) {
      return () => clearTimeout(timer);
    }
  }, [videoQuery.isSuccess]);
  if (videoQuery.isLoading) return <div></div>;

  if (videoQuery.isSuccess) {
    const findTrailer = () => {
      return videoQuery.data.results.find((item) => item.type === 'Trailer');
    };
    const item = findTrailer() ? findTrailer() : videoQuery.data.results[0];
    if (item === undefined) {
      return (
        <div className='relative w-full h-full flex items-center justify-center top-10 '>
          {showNoVideoMessage && (
            <p
              className={`absolute p-3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-400 rounded-md flex items-center justify-center ${
                fadeOut ? 'fade-out' : ''
              }`}
            >
              비디오 정보가 없습니다. 🥲
            </p>
          )}
        </div>
      );
    }

    return (
      <React.Fragment>
        <article className={`video-container ${videoLoaded ? 'loaded' : ''} ${hide} w-screen`}>
          <Button
            label='비디오 접기'
            bg='main'
            className='z-10 absolute bottom-12 min-w-fit'
            onClick={videoHendler}
          />
          {isPending ? (
            <div>loading</div>
          ) : (
            <YouTube
              className='h-full'
              videoId={item.key ? item.key : 'key'}
              opts={opts}
              onReady={onPlayerReady}
              onError={onError}
            />
          )}
        </article>
        <div
          className={`video-button ${
            videoLoaded ? 'pointer-events-none' : 'video-button-open'
          } w-full relative`}
        >
          <Button
            label='비디오 펼치기'
            bg='main'
            className={`absolute left-0`}
            onClick={videoHendler}
          />
        </div>
      </React.Fragment>
    );
  }
  return (
    <div className='relative w-full h-full flex items-center justify-center top-10 '>
      {showNoVideoMessage && (
        <p
          className={`absolute p-3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-400 rounded-md flex items-center justify-center ${
            fadeOut ? 'fade-out' : ''
          }`}
        >
          비디오 정보가 없습니다. 🥲
        </p>
      )}
    </div>
  );
}
