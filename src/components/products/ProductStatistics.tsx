'use client';

import { useQuery } from '@tanstack/react-query';
import { getProductById } from '@/api/products';
import { ProductResponse } from '@/types/product';
import StatisticCard from '@/components/products/StatisticCard';

export interface ProductStatisticsProps {
  id: number;
}

type StatConfig = {
  key: string;
  label: string;
  render: (product: ProductResponse | undefined) => string | number | undefined;
};

const STATS: StatConfig[] = [
  {
    key: 'rating',
    label: '별점 평균',
    render: (product) => product?.rating?.toFixed(1),
  },
  {
    key: 'favoriteCount',
    label: '찜',
    render: (product) => product?.favoriteCount,
  },
  {
    key: 'reviewCount',
    label: '리뷰',
    render: (product) => product?.reviewCount,
  },
];

export default function ProductStatistics({ id }: ProductStatisticsProps) {
  const { data: product, isLoading } = useQuery<ProductResponse>({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    enabled: Boolean(id),
  });

  if (isLoading)
    return (
      <section className="w-full mx-auto mb-4 sm:mb-6 lg:mb-8 min-h-[120px] flex items-center justify-center text-gray-400">
        로딩 중...
      </section>
    );

  return (
    <section className="w-full mx-auto mb-4 sm:mb-6 lg:mb-8">
      <h2 className="mb-[30px] text-[18px] font-semibold text-gray-50">상품 통계</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {STATS.map((stat) => (
          <StatisticCard key={stat.key} value={stat.render(product)} label={stat.label} />
        ))}
      </div>
    </section>
  );
}
