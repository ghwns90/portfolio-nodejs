import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      console.error("[전역 조회 에러]:", error);
      alert("데이터를 가져오는 중 문제가 발생했습니다.");
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      console.log("[전역 변경 에러]:",error);
      alert(`요청 처리 중 오류: ${error.message}`);
    },
  }),
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, //기본 신선도 5분
    },
  },
})