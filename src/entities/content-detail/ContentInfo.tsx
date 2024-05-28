import React from 'react';

type ContentInfoProps = {
  content: {
    title: string;
    name: string;
    overview: string;
    original_title: string;
    vote_average: number;
  };
};

const ContentInfo: React.FC<ContentInfoProps> = ({ content }) => {
  return (
    <div className='flex flex-col justify-start w-full gap-3 z-10'>
      <p className='text-3xl'>{content.title || content.name}</p>
      <p className='text-md'>{content.original_title}</p>
      <p className='border-b border-gray-300 pb-2 mb-2'>회원 점수 {content.vote_average}</p>
      <p className='leading-loose overflow-y-scroll'>{content.overview}</p>
    </div>
  );
};
export default ContentInfo;
