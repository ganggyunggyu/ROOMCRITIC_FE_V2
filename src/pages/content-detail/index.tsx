import React from 'react';
import { useParams } from 'react-router-dom';

import ContentInfo from '../../entities/content-detail/ContentInfo';
import ContentDetailActions from '../../entities/content-detail/ContentDetailActions';
import ResponsiveProvider from '../ui/ResponsiveProvider';
import CartegofyContents from '../../features/content/ui/CategoryContents';
import { ContentVideo } from '../../entities/content-detail/ContentVideo';
import { useAppDispatch } from '../../app/store';
import { setBackgroundPath } from '../../app/store/slice/backgroundPath';
import { useContentFetch } from '../../features/content/api/hooks';
import ReviewListInContentDetail from '../../test/ReviewListInContentDetail';
import { useReviewByContentTemp } from '../../features/review/hooks/hooks';

export default function ContentDetail() {
  const { contentIdParam = '' } = useParams();
  const [isPrevInfo, setIsPrevInfo] = React.useState(contentIdParam);
  const dispath = useAppDispatch();
  const {
    isLoading: isContentLoading,
    data: result,
    refetch: contentRefetch,
  } = useContentFetch(contentIdParam);
  const { data: reviews, isLoading: isReviewLoading } = useReviewByContentTemp(contentIdParam);

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
        <ContentVideo type={content.contentType} id={content.id} />
        <ContentInfo content={content} />
        <ContentDetailActions isLoading={isContentLoading} content={content} />
        {reviews.length === 0 && <p className='pt-10 text-lg'>남겨진 리뷰가 없어요 🥲</p>}
        {reviews.length !== 0 && (
          <ReviewListInContentDetail contentTitle={content.title} reviews={reviews} />
        )}
        <CartegofyContents />
      </ResponsiveProvider>
    );
  }
}
