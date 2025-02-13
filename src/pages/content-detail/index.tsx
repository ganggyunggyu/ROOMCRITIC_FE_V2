import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '@/app/store';
import { setBackgroundPath } from '@/app/store/slice/backgroundPath';
import { ResponsiveProvider } from '@/widgets';
import { Action, Category, Info, ReviewListInContentDetail } from '@/features';
import { useContentFetch, useReviewByContentTemp } from '@/entities';

export default function ContentDetail() {
  const { contentIdParam = '' } = useParams();
  const [isPrevInfo, setIsPrevInfo] = React.useState(contentIdParam);
  const dispath = useAppDispatch();
  const {
    isLoading: isContentLoading,
    data: result,
    refetch: contentRefetch,
  } = useContentFetch(contentIdParam);
  const { data: reviews, isLoading: isReviewLoading } =
    useReviewByContentTemp();

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
        <Info content={content} />
        <Action isLoading={isContentLoading} content={content} />
        {reviews.length === 0 && (
          <p className="pt-10 text-lg">남겨진 리뷰가 없어요 🥲</p>
        )}
        {reviews.length !== 0 && (
          <ReviewListInContentDetail
            contentTitle={content.title}
            reviews={reviews}
          />
        )}
        <Category />
      </ResponsiveProvider>
    );
  }
}
