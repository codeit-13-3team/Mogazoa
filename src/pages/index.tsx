import Category from '@/components/home/Category';
import { InfiniteProductList } from '@/components/home/InfiniteProductList';
import ProductList from '@/components/home/ProductList';
import ReviewerRanking from '@/components/home/ReviewerRanking';
import { useState } from 'react';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);
  const keyword = '';
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  return (
    <div className="text-gray-50 flex w-full">
      <div className="mx-auto w-full flex justify-center">
        <Category
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setSelectedCategoryName={setSelectedCategoryName}
        />

        <div className="flex min-w-0 flex-col lg:flex-row-reverse gap-[10px]">
          <div className="flex flex-col mb-[60px] lg:border-l-[1px] lg:border-black-400 lg:pl-[30px] lg:h-screen pt-[30px] px-5">
            <p className="text-[14px] mb-5">리뷰어 랭킹</p>
            <div className="overflow-x-auto w-full">
              <ReviewerRanking />
            </div>
          </div>

          <div className="lg:pl-[90px] lg:pr-[60px] md:px-[30px] px-5 max-w-[1200px] w-full flex-1 min-w-0">
            {!keyword && !selectedCategory ? (
              <div>
                <div>
                  <h4 className="text-[20px] font-semibold mb-[30px] text-gray-50 lg:pt-[60px]">
                    지금 핫한 상품 TOP 6
                  </h4>
                  <ProductList order="reviewCount" />
                </div>

                <div className="mt-[60px]">
                  <h4 className="text-[20px] font-semibold mb-[30px] text-gray-50">
                    별점이 높은 상품
                  </h4>
                  <ProductList order="rating" />
                </div>
              </div>
            ) : (
              <div className="mt-[60px]">
                <div className="flex items-start justify-between">
                  <div className="text-gray-50 text-[20px] font-semibold mb-[30px]">
                    {selectedCategory && keyword && (
                      <span>
                        {selectedCategoryName} 카테고리의 '{keyword}'로 검색한 상품
                      </span>
                    )}
                    {selectedCategory && !keyword && (
                      <span>{selectedCategoryName}의 모든 상품</span>
                    )}
                    {!selectedCategory && keyword && <span>'{keyword}'로 검색한 상품</span>}
                  </div>
                  <div className="flex gap-2">
                    <span onClick={() => setSelectedOrder('recent')} className="cursor-pointer">
                      최신순
                    </span>
                    <span onClick={() => setSelectedOrder('rating')} className="cursor-pointer">
                      별점순
                    </span>
                    <span
                      onClick={() => setSelectedOrder('reviewCount')}
                      className="cursor-pointer"
                    >
                      리뷰순
                    </span>
                  </div>
                </div>
                <InfiniteProductList
                  order={selectedOrder}
                  keyword={keyword}
                  category={selectedCategory}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
