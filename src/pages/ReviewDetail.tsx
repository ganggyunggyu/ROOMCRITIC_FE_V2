import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../store/atoms';

import { formatDateWithTime } from '../util/Regs';
import CategoryReviewList from '../components/CategoryReviewList';
import Footer from '../components/Footer';
import DetailBackground from '../components/DetailBackground';
import Button from '../components/AtomComponent/Button';
import ResponsiveProvider from '../components/WrapProvider/ResponsiveProvider';
import StarIcon from '../icons/StarIcon';
import useReviewDelete from '../hooks/review/useReviewDelete';
import useReviewSelect from '../hooks/review/useReviewSelect';
import Loading from '../components/Loading';

export default function ReviewDetail() {
  const { userId, reviewId } = useParams();
  const navigator = useNavigate();
  const [stars, setStars] = React.useState([]);
  const { selectReviewQuery } = useReviewSelect(userId, reviewId);
  const { reviewDeleteMutate } = useReviewDelete(reviewId, userId);
  const user = useRecoilValue(userInfoState);
  const directUpdate = () => {
    navigator(`/update/${userId}/${reviewId}`);
  };

  useEffect(() => {
    if (!selectReviewQuery.isPending) {
      const stars = Array.from({ length: +selectReviewQuery.data.data.review.grade }, () => 0);
      setStars(stars);
    }
  }, [selectReviewQuery.isPending]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (selectReviewQuery.isPending) {
    return <Loading />;
  }
  const { formattedDateEnd } = formatDateWithTime(selectReviewQuery.data.data.review.createTime);
  return (
    <React.Fragment>
      <DetailBackground path={selectReviewQuery.data.data.review.contentBackdropImg} />
      <ResponsiveProvider direction={'col'} className={'gap-5 z-10'}>
        <p>
          {selectReviewQuery.data.data.review.userName}님의{' '}
          {selectReviewQuery.data.data.review.contentName} 리뷰
        </p>
        <p>{formattedDateEnd} 작성</p>
        <p className='border border-b-4 p-2 text-center leading-loose text-3xl md:text-5xl'>
          {selectReviewQuery.data.data.review.lineReview}
        </p>
        {selectReviewQuery.data.data.review.longReview !== '' && (
          <p className='leading-loose text-lg md:text-5xl'>
            {selectReviewQuery.data.data.review.longReview}
          </p>
        )}

        <p className='flex flex-row gap-1'>
          {stars.map((_, i) => {
            return <StarIcon key={i} color={'yellow'} />;
          })}
        </p>
      </ResponsiveProvider>
      <ResponsiveProvider direction={'col'} className={'gap-5 z-10 lg:flex-row transition-all'}>
        <Button label={'좋아요 🤩'} bg={'main'} className={'lg:w-6/12 w-full text-lg'} />
        <Button label={'별로에요 🧐'} bg={'main'} className={'lg:w-6/12 w-full text-lg'} />
        {user._id === selectReviewQuery.data.data.review.userId && (
          <React.Fragment>
            <Button
              onClick={directUpdate}
              label={'수정'}
              bg={'main'}
              className={'lg:w-3/12 w-full text-lg'}
            />
            <Button
              // @ts-expect-error

              onClick={reviewDeleteMutate.mutate}
              label={'삭제'}
              bg={'alert'}
              className={'lg:w-3/12 w-full text-lg'}
            />
          </React.Fragment>
        )}
      </ResponsiveProvider>
      <ResponsiveProvider direction='col'>
        <Link
          className='text-xl cursor-pointer hover:text-violet-400 z-10'
          to={`/content/${selectReviewQuery.data.data.review.contentType}/${selectReviewQuery.data.data.review.contentId}`}
        >
          {selectReviewQuery.data.data.review.contentName} 다른 리뷰도 보러가기 !
        </Link>
      </ResponsiveProvider>
      <CategoryReviewList />
      <Footer />
    </React.Fragment>
  );
}
