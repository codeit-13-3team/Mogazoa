'use client';

import Image from 'next/image';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ProductResponse } from '@/types/product';
import { getProductById } from '@/api/products';
import ProductDetailButtonGroup from '@/components/products/ProductDetailButtonGroup';
import CategoryTag from './CategoryTag';

interface ProductDetailProps {
  id: number;
}

const toggleFavorite = async (productId: number, isFavorite: boolean): Promise<void> => {
  const method = isFavorite ? 'DELETE' : 'POST';
  const res = await fetch(`https://mogazoa-api.vercel.app/13-3/products/${productId}/favorite`, {
    method,
  });
  if (!res.ok) {
    throw new Error(`Failed to ${isFavorite ? 'unlike' : 'like'} product`);
  }
};

export default function ProductDetail({ id }: ProductDetailProps) {
  const queryClient = useQueryClient();

  const { data: product, isLoading } = useQuery<ProductResponse>({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    enabled: Boolean(id),
  });

  const favoriteMutation = useMutation<void, Error, { productId: number; isFavorite: boolean }>({
    mutationFn: ({ productId, isFavorite }) => toggleFavorite(productId, isFavorite),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product', id] });
    },
  });

  const handleFavoriteClick = () => {
    if (product) {
      favoriteMutation.mutate({ productId: product.id, isFavorite: product.isFavorite });
    }
  };

  if (isLoading) {
    return (
      <section className="flex items-center justify-center min-h-[200px]">
        <span>로딩 중...</span>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="flex items-center justify-center min-h-[200px] text-gray-400">
        상품 정보가 존재하지 않습니다.
      </section>
    );
  }

  return (
    <section className="w-full mx-auto mb-[60px] lg:mb-20">
      <div className="w-full flex flex-col lg:flex-row items-center gap-4">
        <div className="aspect-video lg:w-[355px] w-full flex-shrink-0 flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.name || '상품 이미지'}
            width={160}
            height={160}
            className="object-contain"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between w-full h-full gap-4">
          <div>
            <CategoryTag name={product.category?.name} />
            <div className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 flex items-center gap-4">
              <span>{product.name || '상품명'}</span>
              <button
                onClick={handleFavoriteClick}
                className="text-gray-400 hover:text-red-500"
                disabled={favoriteMutation.isPending}
              >
                {product.isFavorite ? '❤️' : '🤍'}
              </button>
            </div>
            <div className="text-sm lg:text-base text-gray-300">{product.description}</div>
          </div>
          <ProductDetailButtonGroup />
        </div>
      </div>
    </section>
  );
}
