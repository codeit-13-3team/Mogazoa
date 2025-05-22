
import { getMyProfile, getUserCreatedProducts, getUserFavoriteProducts, getUserReviewedProducts } from '@/api/user';
import Activity from '@/components/Activity';
import { DropDown, DropDownOption } from '@/components/DropDown';
import Product from '@/components/Product';
import Profile from '@/components/Profile';
import { GetMeResponse } from '@/types/user';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

function MyPage() {
  const [showProductState, setShowProductState] = useState<string | number>(1);
  const { data: profileData } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getMyProfile,
  });

  const { data: reviewedProducts } = useQuery({
      queryKey: ['reviewedProduct'],
      queryFn: () => getUserReviewedProducts(String(profileData?.id)),
      select: (data) => data.list,
      enabled: Boolean(profileData),
    });
  
    const { data: createdProducts } = useQuery({
      queryKey: ['createdProducts'],
      queryFn: () => getUserCreatedProducts(String(profileData?.id)),
      select: (data) => data.list,
      enabled: Boolean(profileData),
    });
  
    const { data: favoriteProducts } = useQuery({
      queryKey: ['favoriteProducts'],
      queryFn: () => getUserFavoriteProducts(String(profileData?.id)),
      select: (data) => data.list,
      enabled: Boolean(profileData),
    });

  function handleDropDown(value: string | number) {
    setShowProductState(value);
  }

  function setSpanTextColor(spanNum: number) {
    return spanNum === showProductState ? 'text-gray-50' : 'text-gray-200';
  }

  const ReviewedProducts = () => {
    switch (showProductState) {
      case 1:
        return (
          <>
            {reviewedProducts ? (
              reviewedProducts.length === 0 ? (
                <div className="flex justify-center items-center text-gray-100 col-span-2 lg:col-span-3">
                  리뷰 남긴 상품이 없습니다.
                </div>
              ) : (
                reviewedProducts.map((product) => (
                  <Product
                    width="100%"
                    height="300px"
                    name={product.name}
                    image={product.image}
                    reviewCount={product.reviewCount}
                    favoriteCount={product.favoriteCount}
                    rating={product.rating}
                  />
                ))
              )
            ) : null}
          </>
        );
      case 2:
        return (
          <>
            {createdProducts ? (
              createdProducts.length === 0 ? (
                <div className="flex justify-center items-center text-gray-100 col-span-2 lg:col-span-3">
                  등록한 상품이 없습니다.
                </div>
              ) : (
                createdProducts.map((product) => (
                  <div className='w-full aspect-[8/9] md:aspect-[1/1]'>
                    <Product
                      width="100%"
                      height="100%"
                      name={product.name}
                      image={product.image}
                      reviewCount={product.reviewCount}
                      favoriteCount={product.favoriteCount}
                      rating={product.rating}
                    />
                  </div>
                ))
              )
            ) : null}
          </>
        );
      case 3:
        return (
          <>
            {favoriteProducts ? (
              favoriteProducts.length === 0 ? (
                <div className="flex justify-center items-center text-gray-100 col-span-2 lg:col-span-3">
                  찜한 상품이 없습니다.
                </div>
              ) : (
                favoriteProducts.map((product) => (
                  <Product
                    width="100%"
                    height="300px"
                    name={product.name}
                    image={product.image}
                    reviewCount={product.reviewCount}
                    favoriteCount={product.favoriteCount}
                    rating={product.rating}
                  />
                ))
              )
            ) : null}
          </>
        );
    }
  };

  const ShowActivitys = ({ profileData }: { profileData : GetMeResponse} ) => {
    return (
      <div className="mt-[30px] flex gap-[10px]">
        <Activity
          text={
            <>
              남긴 <br className="md:hidden" />
              별점 평균
            </>
          }
          icon="/icon/common/star.png"
          dataNumber={profileData.averageRating}
        />
        <Activity
          text="남긴 리뷰"
          icon="/icon/common/bubble.png"
          dataNumber={profileData.reviewCount}
        />
        <Activity
          text={
            <>
              관심 <br className="md:hidden" />
              카테고리
            </>
          }
          category="/chip/category/electronicS.png"
        />
      </div>
    );
  };

  return (
    <div className="mt-[30px] px-[20px] min-h-screen md:px-[117px] lg:mx-auto lg:px-0 lg:flex lg:justify-center lg:gap-[70px] max-w-[1340px]">
      <div className="h-auto">
        {profileData ? <Profile profileData={profileData} isMyProfile={true} /> : null}
      </div>
      <div className="w-full flex flex-col">
        <div className="mb-[60px]">
          <span className="text-gray-50 font-semibold text-[18px] lg:text-[20px]">활동 내역</span>
          { profileData ? <ShowActivitys profileData={profileData} /> : null }
        </div>
        <div className="w-full h-auto">
          <DropDown
            useBaseStyle={false}
            onChange={handleDropDown}
            divClassName="w-[150px] lg:hidden"
            textClassName="text-gray-50 font-semibold text-[18px]"
            value={1}
          >
            <DropDownOption value={1}>리뷰 남긴 상품</DropDownOption>
            <DropDownOption value={2}>등록한 상품</DropDownOption>
            <DropDownOption value={3}>찜한 상품</DropDownOption>
          </DropDown>
          <div className="hidden lg:flex gap-10">
            <span
              className={`${setSpanTextColor(1)} text-[20px] font-semibold hover:cursor-pointer`}
              onClick={() => setShowProductState(1)}
            >
              리뷰 남긴 상품
            </span>
            <span
              className={`${setSpanTextColor(2)} text-[20px] font-semibold hover:cursor-pointer`}
              onClick={() => setShowProductState(2)}
            >
              등록한 상품
            </span>
            <span
              className={`${setSpanTextColor(3)} text-[20px] font-semibold hover:cursor-pointer`}
              onClick={() => setShowProductState(3)}
            >
              찜한 상품
            </span>
          </div>
          <div className="mt-[54px] mb-[60px] w-full h-[300px] overflow-y-auto grid grid-cols-2 gap-[15px] md:h-[450px] lg:grid-cols-3 lg:gap-5">
            <ReviewedProducts />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;