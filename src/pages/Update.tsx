import React from 'react';
import { useParams } from 'react-router-dom';
import DetailBackground from '../components/DetailBackground';
import useReviewSelect from '../shared/hooks/review/useReviewSelect';
import Loading from '../components/Loading';
import ResponsiveProvider from '../components/WrapProvider/ResponsiveProvider';
import UpdateForm from '../components/Update/UpdateForm';
export default function Update() {
  const { userId = '', reviewId = '' } = useParams();
  const { selectReviewQuery } = useReviewSelect(userId, reviewId);

  if (selectReviewQuery.isLoading) return <Loading />;

  return (
    <ResponsiveProvider direction='col' className='gap-5'>
      <DetailBackground path={selectReviewQuery.data?.data.review.contentBackdropImg} />
      <p className='text-3xl'>{selectReviewQuery.data?.data.review.contentName} 리뷰 수정</p>
      <UpdateForm />
    </ResponsiveProvider>
  );
}
