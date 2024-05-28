import React from 'react';
import { useParams } from 'react-router-dom';

import useContentFetch from '../../shared/hooks/content/useContentFetch';
import useSeletedContentReviews from '../../shared/hooks/content/useContentReviews';

import ContentInfo from '../../entities/content-detail/ContentInfo';
import ContentDetailActions from '../../entities/content-detail/ContentDetailActions';
import ResponsiveProvider from '../ui/ResponsiveProvider';
import CardWrapProvider from '../../entities/wrap-provider/CardWrapProvider';
import CartegofyContents from '../../features/content/ui/CategoryContents';
import { ContentVideo } from '../../entities/content-detail/ContentVideo';
import { useAppDispatch } from '../../app/store';
import { setBackgroundPath } from '../../app/store/slice/backgroundPath';

export default function ContentDetail() {
  const { contentTypeParam = '', contentIdParam = '' } = useParams();
  const contentInfo = (contentTypeParam as string) + contentIdParam;
  const [isPrevInfo, setIsPrevInfo] = React.useState(contentInfo);
  const dispath = useAppDispatch();
  const {
    isLoading: isContentLoading,
    data: content,
    refetch: contentRefetch,
  } = useContentFetch(contentTypeParam, contentIdParam);
  const { isLoading: isReviewsLoading, data: reviews } = useSeletedContentReviews(
    contentTypeParam,
    contentIdParam,
  );

  React.useEffect(() => {
    if (!isContentLoading && content) {
      dispath(setBackgroundPath(content.backdrop_path));
    }
  }, [isContentLoading, content]);

  if (contentInfo !== isPrevInfo) {
    contentRefetch();
    setIsPrevInfo(contentInfo);
  }

  if (isContentLoading && isReviewsLoading) {
    return <div />;
  }

  if (!isContentLoading && !isReviewsLoading) {
    return (
      <ResponsiveProvider direction={'col'} className={'gap-10'}>
        <ContentVideo type={content.content_type} id={content.id} />
        <ContentInfo content={content} />
        <ContentDetailActions isLoading={isContentLoading} content={content} />
        {reviews.length === 0 && <p className='pt-10 text-lg'>남겨진 리뷰가 없어요 🥲</p>}
        {reviews.length !== 0 && (
          <CardWrapProvider title={`${content.title}에 남겨진 리뷰`} cardList={reviews} />
        )}
        <CartegofyContents />
      </ResponsiveProvider>
    );
  }
}
