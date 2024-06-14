import React from 'react';
import { useParams } from 'react-router-dom';
import { ResponsiveProvider } from '../ui';
import { useAppDispatch } from '../../shared/store';
import { setBackgroundPath } from '../../shared/store/slice/backgroundPath';
import { useContentFetch } from '../../features/content/api/hooks';

import { Content, Review } from '../../features';

export default function ContentDetail() {
  const { contentIdParam = '' } = useParams();
  const [isPrevInfo, setIsPrevInfo] = React.useState(contentIdParam);
  const dispath = useAppDispatch();
  const {
    isLoading: isContentLoading,
    data: result,
    refetch: contentRefetch,
  } = useContentFetch(contentIdParam);
  const { data: reviews, isLoading: isReviewLoading } = Review.H.useReviewByContentTemp();

  React.useEffect(() => {
    if (!isContentLoading && result.content) {
      dispath(setBackgroundPath(result.content.backdropPath));
    }
  }, [isContentLoading, result]);

  if (contentIdParam !== isPrevInfo) {
    contentRefetch();
    setIsPrevInfo(contentIdParam);
  }

  if (isContentLoading || isReviewLoading) {
    return <div />;
  }

  if (!isContentLoading) {
    const { content } = result;
    return (
      <ResponsiveProvider direction={'col'} className={'gap-10'}>
        <Content.U.Video type={content.contentType} id={content.id} />
        <Content.U.Info content={content} />
        <Content.U.Action isLoading={isContentLoading} content={content} />
        {reviews.length === 0 && <p className='pt-10 text-lg'>남겨진 리뷰가 없어요 🥲</p>}
        {reviews.length !== 0 && (
          <Review.U.ReviewListInContentDetail contentTitle={content.title} reviews={reviews} />
        )}
        <Content.U.Category />
      </ResponsiveProvider>
    );
  }
}
