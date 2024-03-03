import React from 'react';

type ContentInfoProps = {
  content: {
    title: string;
    name: string;
    overview: string;
  };
};

const ContentInfo: React.FC<ContentInfoProps> = ({ content }) => {
  return (
    <div className='flex flex-col gap-3'>
      <p className='text-3xl'>{content.title || content.name}</p>
      <p className='leading-loose overflow-y-scroll'>{content.overview}</p>
    </div>
  );
};
export default ContentInfo;
