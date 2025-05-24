import Image from 'next/image';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ProductResponse } from '@/types/product';
import { getProductById } from '@/api/products';
import ProductDetailButtonGroup from '@/components/products/ProductDetailButtonGroup';
import CategoryTag from './CategoryTag';
import Share from '../../../public/icon/common/share.png';
import unFilledHeart from '../../../public/icon/common/unsave.png';
import FilledHeart from '../../../public/icon/common/save.png';
import useAuthStore from '@/stores/authStores';
import { useRouter } from 'next/router';
import axiosInstance from '@/api/axiosInstance';
import { useEffect } from 'react';

interface ProductDetailProps {
  id: number;
}

const toggleFavorite = async (productId: number, isFavorite: boolean): Promise<void> => {
  try {
    if (isFavorite) {
      await axiosInstance.delete(`/products/${productId}/favorite`);
    } else {
      await axiosInstance.post(`/products/${productId}/favorite`);
    }
  } catch (err: any) {
    throw new Error(err.message || 'Failed to toggle favorite');
  }
};

export default function ProductDetail({ id }: ProductDetailProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

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
    onError: (err) => {
      if (err.message === 'Unauthorized') {
        alert('로그인이 필요한 기능입니다.');
        router.push('/login');
      } else {
        alert(err.message);
      }
    },
  });

  const handleFavoriteClick = () => {
    if (!isLoggedIn) {
      alert('로그인이 필요한 기능입니다.');
      return router.push('/login');
    }
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
      <div className="w-full flex flex-col md:flex-row items-center gap-4">
        <div className="lg:w-[355px] min-w-[240px] w-full flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.name || '상품 이미지'}
            width={160}
            height={160}
            className="object-contain"
          />
        </div>
        <div className="flex flex-col justify-between min-w-0 w-full">
          <>
            <div className="flex justify-between mb-[10px]">
              <CategoryTag name={product.category?.name} />
              <div className="p-[5px] bg-black-400 rounded-[6px] block md:hidden">
                <Image src={Share} alt="공유하기 아이콘" width={14} height={14} />
              </div>
            </div>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold mb-5 md:mb-[50px] flex items-center justify-between">
              <div className="flex items-center gap-[15px]">
                <span>{product.name || '상품명'}</span>
                {product.isFavorite ? (
                  <Image
                    src={FilledHeart}
                    alt="좋아요 아이콘"
                    width={24}
                    height={24}
                    onClick={handleFavoriteClick}
                  />
                ) : (
                  <Image
                    src={unFilledHeart}
                    alt="비어있는 좋아요 아이콘"
                    width={24}
                    height={24}
                    onClick={handleFavoriteClick}
                  />
                )}
              </div>
              <div className="p-[5px] bg-black-400 rounded-[6px] hidden md:block">
                <Image src={Share} alt="공유하기 아이콘" width={14} height={14} />
              </div>
            </div>
            <div className="text-sm lg:text-base mb-[67px] md:mb-[60px] text-gray-50">
              {product.description}
            </div>
          </>
          <ProductDetailButtonGroup product={product} />
        </div>
      </div>
    </section>
  );
}
