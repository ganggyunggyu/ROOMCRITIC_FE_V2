import React from 'react';
import ContentInfo from '../components/content-detail/ContentInfo';
import { useParams } from 'react-router-dom';
import ResponsiveProvider from '../components/wrap-provider/ResponsiveProvider';
import useContentFetch from '../shared/hooks/content/useContentFetch';
import CardWrapProvider from '../components/wrap-provider/CardWrapProvider';
import CategoryReviewList from '../components/CategoryContents';
import DetailBackground from '../components/DetailBackground';
import useSeletedContentReviews from '../shared/hooks/content/useSelectedContentReviewsQuery';
import Loading from '../components/Loading';

import ContentDetailActions from '../components/content-detail/ContentDetailActions';

export default function ContentDetail() {
  const { contentType = '', contentId = '' } = useParams();
  const contentInfo = (contentType as string) + contentId;
  const [isPrevInfo, setIsPrevInfo] = React.useState(contentInfo);
  const { detailContentQuery } = useContentFetch(contentType, contentId);
  const { selectedContentReviewsQuery } = useSeletedContentReviews(contentType, contentId);

  if (contentInfo !== isPrevInfo) {
    detailContentQuery.refetch();
    setIsPrevInfo(contentInfo);
  }
  const { isLoading: isContentLoading, data: contentData } = detailContentQuery;
  const { isLoading: isReviewsLoading, data: reviewsData } = selectedContentReviewsQuery;

  if (isContentLoading && isReviewsLoading) {
    return <Loading />;
  }

  if (!isContentLoading && !isReviewsLoading) {
    const content = contentData?.data.content;
    const reviews = reviewsData?.data.reviews;

    return (
      <React.Fragment>
        <ResponsiveProvider direction={'col'} className={'gap-10'}>
          <DetailBackground path={content.backdrop_path} />
          <ContentInfo content={content} />
          <ContentDetailActions isLoading={isContentLoading} data={contentData} />
          <React.Fragment>
            {reviews.length === 0 ? (
              <p className='pt-10 text-lg'>남겨진 리뷰가 없어요 🥲</p>
            ) : (
              <CardWrapProvider
                title={`${content.title}에 남겨진 리뷰`}
                cardList={reviews}
                isHover={true}
              />
            )}
          </React.Fragment>
        </ResponsiveProvider>
        <CategoryReviewList />
      </React.Fragment>
    );
  }
}
