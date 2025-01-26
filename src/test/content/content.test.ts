import { test } from 'vitest';
import {
  getRecentlyReviewedContent,
  RecentlyReviewedContentRequest,
} from '@/entities';

test('최근에 작성 된 리뷰가 있는 콘텐츠 리스트 데이터를 가져옵니다.', async () => {
  const MOCK_REQUEST: RecentlyReviewedContentRequest = {
    pageParam: 0,
    contentType: null,
  };

  const result = await getRecentlyReviewedContent(MOCK_REQUEST);

  result.data.contentList.map((content) => console.log(content.title));
});
