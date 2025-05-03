import { useInfiniteQuery } from '@tanstack/react-query';
import { getProductList } from '@/api/products';

export function useInfiniteProductList({
  order = 'default',
  keyword = '',
  category = null,
  limit = 20,
}: {
  order?: string;
  keyword?: string;
  category?: number | null;
  limit?: number;
}) {
  return useInfiniteQuery({
    queryKey: ['products', { keyword, category, order, limit }],
    queryFn: ({ pageParam = 0 }) => getProductList(keyword, category, order, Number(pageParam)),
    getNextPageParam: (last) => last.nextCursor ?? undefined,
    staleTime: 1000 * 60 * 2,
    initialPageParam: 0,
  });
}
