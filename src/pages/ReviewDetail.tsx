import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
// import { useRecoilValue } from 'recoil';
// import { userInfoState } from '../store/atoms';

import { formatDateWithTime } from '../shared/util/regs';
import CategoryReviewList from '../components/CategoryContents';
import Footer from '../components/Footer';
import DetailBackground from '../components/DetailBackground';
import Button from '../components/AtomComponent/Button';
import ResponsiveProvider from '../components/WrapProvider/ResponsiveProvider';
import useReviewDelete from '../shared/hooks/review/useReviewDelete';
import useReviewSelect from '../shared/hooks/review/useReviewSelect';
import Loading from '../components/Loading';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../app/store/atoms';

export default function ReviewDetail() {
  const { userId, reviewId } = useParams();
  const navigator = useNavigate();

  const { selectReviewQuery } = useReviewSelect(userId, reviewId);
  const { reviewDeleteMutate } = useReviewDelete(reviewId, userId);
  const { _id } = useRecoilValue(userInfoState);

  const { isLoading: isReviewLoading, data: reviewData } = selectReviewQuery;

  const directUpdate = () => {
    navigator(`/update/${userId}/${reviewId}`);
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  if (isReviewLoading) {
    return <Loading />;
  }
  const { formattedDateEnd } = formatDateWithTime(selectReviewQuery.data.data.review.createTime);
  const { review } = reviewData.data;

  return (
    <React.Fragment>
      <DetailBackground path={review.contentBackdropImg} />
      <ResponsiveProvider direction={'col'} className={'gap-5 z-10'}>
        <Link to={`/profile/${review.userId}`}>
          {review.userName}님의 {review.contentName} 리뷰
        </Link>
        <p>{formattedDateEnd} 작성</p>
        <p className='border border-b-4 p-2 text-center leading-loose text-3xl md:text-5xl'>
          {review.lineReview}
        </p>
        {review.longReview !== '' && (
          <p className='leading-loose text-lg md:text-5xl'>{review.longReview}</p>
        )}

        <Button label={'좋아요 🤩'} bg={'main'} className={'lg:w-6/12 w-full text-lg'} />
        <Button label={'별로에요 🧐'} bg={'main'} className={'lg:w-6/12 w-full text-lg'} />
        {_id === review.userId && (
          <React.Fragment>
            <Button
              onClick={directUpdate}
              label={'수정'}
              bg={'main'}
              className={'lg:w-3/12 w-full text-lg'}
            />
            <Button
              onClick={() => reviewDeleteMutate.mutate()}
              label={'삭제'}
              bg={'alert'}
              className={'lg:w-3/12 w-full text-lg'}
            />
          </React.Fragment>
        )}
        <Link
          className='text-xl cursor-pointer hover:text-violet-400 z-10'
          to={`/content/${review.contentType}/${selectReviewQuery.data.data.review.contentId}`}
        >
          {review.contentName} 다른 리뷰도 보러가기 !
        </Link>
      </ResponsiveProvider>
      <CategoryReviewList />
      <Footer />
    </React.Fragment>
  );
}
