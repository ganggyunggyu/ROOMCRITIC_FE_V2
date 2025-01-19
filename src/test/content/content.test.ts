import { getRecentlyCreateReviewContent } from '@/entities';
import { test } from 'vitest';

test('최근에 작성 된 리뷰가 있는 콘텐츠 리스트 데이터를 가져옵니다.', async () => {
  const result = await getRecentlyCreateReviewContent(0);

  console.log(result.length);
});
