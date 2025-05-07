import Category from '@/components/home/Category';
import { InfiniteProductList } from '@/components/home/InfiniteProductList';
import ProductList from '@/components/home/ProductList';
import ReviewerRanking from '@/components/home/ReviewerRanking';
import { useState } from 'react';
import categoryIcon from '../../public/icon/common/category.png';
import Image from 'next/image';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);
  const keyword = '';
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <div className="text-gray-50 flex w-full min-h-screen">
      <div className="mx-auto w-full flex justify-center relative">
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black-300/80 z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
        <div className="z-50">
          <Category
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setSelectedCategoryName={setSelectedCategoryName}
            isMenuOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
          />
        </div>

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
                    지금 핫한 상품
                    <span className="ml-[10px] bg-gradient-to-r from-main-blue to-main-indigo bg-clip-text text-transparent">
                      TOP 6
                    </span>
                  </h4>
                  <button onClick={() => setIsMenuOpen((o) => !o)}>테스트</button>
                  <ProductList order="reviewCount" />
                </div>

                <div className="mt-[60px] mb-[20px]">
                  <h4 className="text-[20px] font-semibold mb-[30px] text-gray-50">
                    별점이 높은 상품
                  </h4>
                  <ProductList order="rating" />
                </div>
              </div>
            ) : (
              <div className="mb-[20px] md:mt-[60px]">
                <div className="flex items-end justify-between mb-[15px]">
                  <div>
                    <div className="text-gray-50 text-[20px] font-semibold">
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
                    {selectedCategory && (
                      <div
                        className="flex items-center bg-black-400 border border-black-300 rounded-[100px] py-[6px] w-fit px-3 mt-[30px] md:hidden cursor-pointer"
                        onClick={() => setIsMenuOpen(true)}
                      >
                        <Image
                          src={categoryIcon}
                          alt="카테고리 아이콘"
                          width={18}
                          height={18}
                          className="mr-[5px]"
                        />
                        <span>{selectedCategoryName}</span>
                      </div>
                    )}
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
