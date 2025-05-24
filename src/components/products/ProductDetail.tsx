'use client';

import Image from 'next/image';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ProductResponse } from '@/types/product';
import { getProductById } from '@/api/products';
import ProductDetailButtonGroup from '@/components/products/ProductDetailButtonGroup';

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
    <section className="w-full mx-auto mb-4 sm:mb-6 lg:mb-8">
      <div className="w-full bg-black-400 rounded-xl flex flex-col lg:flex-row items-center gap-4 lg:gap-8 p-4 sm:p-6 lg:p-8">
        <div className="w-full sm:w-[180px] h-[180px] flex-shrink-0 flex items-center justify-center bg-black-500 rounded-lg border border-gray-200">
          <Image
            src={
              product.image ||
              'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MWP22?wid=1144&hei=1144&fmt=jpeg&qlt=80&.v=1591634795000'
            }
            alt={product.name || '상품 이미지'}
            width={160}
            height={160}
            className="object-contain"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between w-full h-full gap-4">
          <div>
            <span className="inline-block bg-gray-200 text-white text-xs px-2 py-1 rounded mb-2">
              {product.category?.name || '브랜드명'}
            </span>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 flex items-center justify-between gap-4">
              <span>{product.name || '상품명'}</span>
              <button
                onClick={handleFavoriteClick}
                className="text-gray-400 hover:text-red-500"
                disabled={favoriteMutation.isPending}
              >
                {product.isFavorite ? '❤️' : '🤍'}
              </button>
            </div>
            <div className="text-sm lg:text-base text-gray-300">
              {product.description || '상품 설명이 들어갑니다.'}
            </div>
          </div>
          <ProductDetailButtonGroup />
        </div>
      </div>
    </section>
  );
}
