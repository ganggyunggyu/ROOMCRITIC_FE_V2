import React from 'react';

type OverviewProps = {
  overview: string;
};

export const Overview: React.FC<OverviewProps> = ({ overview }) => {
  return (
    <div className='w-full border-y border-solid py-5 border-slate-200'>
      {overview ? (
        <p className='leading-loose overflow-y-scroll'>
          {overview.split('다.').map((sentence, index) => {
            console.log(sentence, index, overview.split('다.').length);
            if (overview.split('다.').length - 1 !== index) sentence = sentence + '다.';

            return (
              <span key={index}>
                {sentence.trim()}
                {index < overview.split('다.').length - 1 && (
                  <>
                    <br />
                  </>
                )}
              </span>
            );
          })}
        </p>
      ) : (
        <p>등록 된 줄거리가 없습니다.</p>
      )}
    </div>
  );
};
