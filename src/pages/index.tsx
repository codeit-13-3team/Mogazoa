import Category from '@/components/home/Category';
import { InfiniteProductList } from '@/components/home/InfiniteProductList';
import ProductList from '@/components/home/ProductList';
import ReviewerRanking from '@/components/home/ReviewerRanking';
import { useState } from 'react';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

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
              <p className="text-[20px] font-semibold mb-[30px] text-gray-50 lg:pt-[60px]">
                지금 핫한 상품 TOP 6
              </p>
              <ProductList order="reviewCount" keyword="" category={null} />
            </div>

            <div className="mt-[60px]">
              <p className="text-[20px] font-semibold mb-[30px] text-gray-50">별점이 높은 상품</p>
              <ProductList order="rating" keyword="" category={null} />
            </div>
          </div>

          {/* <InfiniteProductList order="reviewCount" keyword="" category={null} /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
