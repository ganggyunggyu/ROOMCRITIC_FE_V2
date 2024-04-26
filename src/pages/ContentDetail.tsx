import React from 'react';
import { useParams } from 'react-router-dom';

import useContentFetch from '../shared/hooks/content/useContentFetch';
import useSeletedContentReviews from '../shared/hooks/content/useContentReviews';

import ContentInfo from '../components/content-detail/ContentInfo';
import ContentDetailActions from '../components/content-detail/ContentDetailActions';
import ResponsiveProvider from '../components/wrap-provider/ResponsiveProvider';
import CardWrapProvider from '../components/wrap-provider/CardWrapProvider';
import CategoryReviewList from '../components/CategoryContents';
import Loading from '../components/Loading';
import DetailBackground from '../components/DetailBackground';

export default function ContentDetail() {
  const { contentType = '', contentId = '' } = useParams();
  const contentInfo = (contentType as string) + contentId;
  const [isPrevInfo, setIsPrevInfo] = React.useState(contentInfo);

  const {
    isLoading: isContentLoading,
    data: Content,
    refetch: contentRefetch,
  } = useContentFetch(contentType, contentId);
  const { isLoading: isReviewsLoading, data: Review } = useSeletedContentReviews(
    contentType,
    contentId,
  );

  if (contentInfo !== isPrevInfo) {
    contentRefetch();
    setIsPrevInfo(contentInfo);
  }

  if (isContentLoading && isReviewsLoading) {
    return <Loading />;
  }

  if (!isContentLoading && !isReviewsLoading) {
    const content = Content?.data.content;
    const reviews = Review?.data.reviews;

    return (
      <React.Fragment>
        <ResponsiveProvider direction={'col'} className={'gap-10'}>
          <DetailBackground path={content.backdrop_path} />
          <ContentInfo content={content} />
          <ContentDetailActions isLoading={isContentLoading} data={Content} />
          {reviews.length === 0 && <p className='pt-10 text-lg'>남겨진 리뷰가 없어요 🥲</p>}
          {reviews.length !== 0 && (
            <CardWrapProvider
              title={`${content.title}에 남겨진 리뷰`}
              cardList={reviews}
              isHover={true}
            />
          )}
        </ResponsiveProvider>
        <CategoryReviewList />
      </React.Fragment>
    );
  }
}
