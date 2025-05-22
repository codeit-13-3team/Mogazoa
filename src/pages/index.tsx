import Category from '@/components/home/Category';
import { InfiniteProductList } from '@/components/home/InfiniteProductList';
import ProductList from '@/components/home/ProductList';
import ReviewerRanking from '@/components/home/ReviewerRanking';
import { JSX, useState } from 'react';
import categoryIcon from '../../public/icon/common/category.png';
import Image from 'next/image';
import CreateProduct from '@/components/ProductForm';
import { Product } from '@/types/product';
import { useQueryClient } from '@tanstack/react-query';
import { getProductById } from '@/api/products';
import { useModal } from '@/context/ModalContext';
import { useRouter } from 'next/router';
import { DropDown, DropDownOption } from '@/components/DropDown';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);

  const router = useRouter();
  const keyword = (router.query.keyword as string) || '';

  const [selectedOrder, setSelectedOrder] = useState<string | null>('recent');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { openModal } = useModal();
  const queryClient = useQueryClient();

  const handleProductClick = async (product: Product) => {
    const productDetail = await queryClient.fetchQuery({
      queryKey: ['product', product.id],
      queryFn: () => getProductById(product.id),
    });

    openModal(<CreateProduct selectedProduct={productDetail} />, productDetail);
  };

  const sort = [
    { key: '최신순', value: 'recent' },
    { key: '별점순', value: 'rating' },
    { key: '리뷰순', value: 'reviewCount' },
  ];

  return (
    <div className="text-gray-50 flex w-full min-h-screen">
      <div className="mx-auto w-full flex justify-center relative">
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black-300/80 z-38 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
        <div className="z-39">
          <Category
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setSelectedCategoryName={setSelectedCategoryName}
            isMenuOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
          />
        </div>

        <div className="flex min-w-0 flex-col lg:flex-row-reverse gap-[10px]">
          <div className="flex flex-col mb-[60px] lg:border-l-[1px] lg:border-black-400 lg:pl-[30px] lg:h-screen pt-[30px]">
            <p className="text-[14px] mb-5 px-5">리뷰어 랭킹</p>
            <div
              className="overflow-x-scroll w-full px-5"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              <ReviewerRanking />
            </div>
          </div>

          <div
            className="
              lg:pl-[90px] lg:pr-[60px]
              md:px-[30px]
              px-5
              max-w-[1200px] w-full
              flex-1 min-w-0
            "
          >
            {!keyword && !selectedCategory ? (
              <div>
                <div>
                  <h4 className="text-[20px] font-semibold mb-[30px] text-gray-50 lg:pt-[60px]">
                    지금 핫한 상품
                    <span className="ml-[10px] bg-gradient-to-r from-main-blue to-main-indigo bg-clip-text text-transparent">
                      TOP 6
                    </span>
                  </h4>
                  <div
                    className="flex items-center bg-black-400 border border-black-300 rounded-[100px] py-[6px] w-fit px-3 mt-[30px] md:hidden cursor-pointer mb-[15px]"
                    onClick={() => setIsMenuOpen(true)}
                  >
                    <Image
                      src={categoryIcon}
                      alt="카테고리 아이콘"
                      width={18}
                      height={18}
                      className="mr-[5px]"
                    />
                    <span>{selectedCategoryName ? selectedCategoryName : '카테고리'}</span>
                  </div>
                  <ProductList order="reviewCount" onProductClick={handleProductClick} />
                </div>

                <div className="mt-[60px] mb-[20px]">
                  <h4 className="text-[20px] font-semibold mb-[30px] text-gray-50">
                    별점이 높은 상품
                  </h4>
                  <ProductList order="rating" onProductClick={handleProductClick} />
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
                      <span>{selectedCategoryName ? selectedCategoryName : '카테고리'}</span>
                    </div>
                  </div>
                  <DropDown
                    divClassName="py-[8px] px-2 md:py-[12px] lg:py-[14px]"
                    textClassName="text-gray"
                    value={selectedOrder}
                    onChange={(value) => setSelectedOrder(value)}
                  >
                    {sort?.map((data) => (
                      <DropDownOption
                        value={data.value}
                        key={data.key}
                        onSelect={() => setSelectedOrder(data.value)}
                      >
                        {data.key}
                      </DropDownOption>
                    ))}
                  </DropDown>
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
