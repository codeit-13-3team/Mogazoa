import Category from '@/components/home/Category';
import Product from '@/components/home/Product';
import ReviewerRanking from '@/components/home/ReviewerRanking';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProductList } from '@/api/products';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const keyword = ''; // 빈 문자열
  const category = selectedCategory ?? null; // 선택된 카테고리(숫자) 혹은 ''
  const order: 'recent' = 'recent'; // 고정값 'recent'
  const cursor = null;

  const {
    data: productList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['productList', keyword, category, order, cursor],
    queryFn: () => getProductList(keyword, category, order, cursor),
  });

  return (
    <div className="text-gray-50 flex w-full">
      <div className="mx-auto w-full flex justify-center">
        <Category selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

        <div className="flex min-w-0 flex-col lg:flex-row-reverse gap-[10px]">
          <div className="flex flex-col mb-[60px] lg:border-l-[1px] lg:border-black-400 lg:pl-[30px] lg:h-screen pt-[30px] px-5">
            <p className="text-[14px] mb-5">리뷰어 랭킹</p>
            <div className="overflow-x-auto w-full">
              <ReviewerRanking />
            </div>
          </div>

          <div className="lg:pl-[90px] lg:pr-[60px] md:px-[30px] px-5 max-w-[1200px] w-full flex-1 min-w-0">
            <div>
              <h4 className="text-[20px] font-semibold mb-[30px] text-gray-50 lg:pt-[60px]">
                지금 핫한 상품 TOP 6
              </h4>
              <Product productList={productList} isLoading={isLoading} error={error} />
            </div>

            <div className="mt-[60px]">
              <h4 className="text-[20px] font-semibold mb-[30px] text-gray-50">별점이 높은 상품</h4>
              <Product productList={productList} isLoading={isLoading} error={error} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
