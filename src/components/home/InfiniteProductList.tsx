import { useInfiniteProductList } from '@/hooks/useInfiniteList';
import Product from './Product';
import { useRef, useEffect } from 'react';

interface Props {
  order: string | null;
  keyword?: string;
  category?: number | null;
}

export function InfiniteProductList({ order, keyword, category }: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteProductList({
    order,
    keyword,
    category,
    limit: 20,
  });

  const products = data?.pages.flatMap((page) => page.list) ?? [];

  const loadMoreRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!hasNextPage || !loadMoreRef.current) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) fetchNextPage();
    });
    obs.observe(loadMoreRef.current);
    return () => obs.disconnect();
  }, [hasNextPage, fetchNextPage]);

  if (status === 'pending') return <p>로딩 중…</p>;
  if (status === 'error') return <p>에러 발생</p>;

  return (
    <ul className="grid grid-cols-2 lg:grid-cols-[repeat(3,minmax(165px,300px))] justify-center gap-[15px] lg:gap-5 w-full">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
      {isFetchingNextPage && <p>더 불러오는 중…</p>}
      <div ref={loadMoreRef} style={{ height: 1 }} />
    </ul>
  );
}
