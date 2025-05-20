import { useQuery } from '@tanstack/react-query';
import { getProductList } from '@/api/products';

export function useProductList({
  order,
  keyword = '',
  category = null,
  limit = 6,
}: {
  order: string;
  keyword?: string;
  category?: number | null;
  limit?: number;
}) {
  return useQuery({
    queryKey: ['products', { keyword, category, order, limit }],
    queryFn: () => getProductList(keyword, category, order, 0),
    select: (res) => ({
      ...res,
      list: res.list.slice(0, limit),
    }),
  });
}
