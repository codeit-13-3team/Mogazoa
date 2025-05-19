import { getUserProfile } from '@/api/user';
import Activity from '@/components/Activity';
import { DropDown, DropDownOption } from '@/components/DropDown';
import Product from '@/components/Product';
import Profile from '@/components/Profile';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function UserPage() {
  const router = useRouter();
  const { userId } = router.query;
  const [showProductState, setShowProductState] = useState<string | number>(1);
  const [tokenReady, setTokenReady] = useState<boolean>(false);
  const { data: profileData, isLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserProfile,
    enabled: tokenReady,
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
            <Product
              width="100%"
              height="300px"
              name="시계"
              image="/img/prodctimage/applewatch.png"
              reviewCount={100}
              favoriteCount={100}
              rating={4.1}
            />
            <Product
              width="100%"
              height="300px"
              name="시계"
              image="/img/prodctimage/applewatch.png"
              reviewCount={100}
              favoriteCount={100}
              rating={4.1}
            />
            <Product
              width="100%"
              height="300px"
              name="시계"
              image="/img/prodctimage/applewatch.png"
              reviewCount={100}
              favoriteCount={100}
              rating={4.1}
            />
            <Product
              width="100%"
              height="300px"
              name="시계"
              image="/img/prodctimage/applewatch.png"
              reviewCount={100}
              favoriteCount={100}
              rating={4.1}
            />
            <Product
              width="100%"
              height="300px"
              name="시계"
              image="/img/prodctimage/applewatch.png"
              reviewCount={100}
              favoriteCount={100}
              rating={4.1}
            />
          </>
        );
      case 2:
        return (
          <>
            <Product
              width="100%"
              height="300px"
              name="시계"
              image="/img/prodctimage/adidas.png"
              reviewCount={100}
              favoriteCount={100}
              rating={4.1}
            />
            <Product
              width="100%"
              height="300px"
              name="시계"
              image="/img/prodctimage/adidas.png"
              reviewCount={100}
              favoriteCount={100}
              rating={4.1}
            />
            <Product
              width="100%"
              height="300px"
              name="시계"
              image="/img/prodctimage/adidas.png"
              reviewCount={100}
              favoriteCount={100}
              rating={4.1}
            />
            <Product
              width="100%"
              height="300px"
              name="시계"
              image="/img/prodctimage/adidas.png"
              reviewCount={100}
              favoriteCount={100}
              rating={4.1}
            />
            <Product
              width="100%"
              height="300px"
              name="시계"
              image="/img/prodctimage/adidas.png"
              reviewCount={100}
              favoriteCount={100}
              rating={4.1}
            />
          </>
        );
      case 3:
        return (
          <>
            <Product
              width="100%"
              height="300px"
              name="시계"
              image="/img/prodctimage/camera.png"
              reviewCount={100}
              favoriteCount={100}
              rating={4.1}
            />
            <Product
              width="100%"
              height="300px"
              name="시계"
              image="/img/prodctimage/camera.png"
              reviewCount={100}
              favoriteCount={100}
              rating={4.1}
            />
            <Product
              width="100%"
              height="300px"
              name="시계"
              image="/img/prodctimage/camera.png"
              reviewCount={100}
              favoriteCount={100}
              rating={4.1}
            />
            <Product
              width="100%"
              height="300px"
              name="시계"
              image="/img/prodctimage/camera.png"
              reviewCount={100}
              favoriteCount={100}
              rating={4.1}
            />
            <Product
              width="100%"
              height="300px"
              name="시계"
              image="/img/prodctimage/camera.png"
              reviewCount={100}
              favoriteCount={100}
              rating={4.1}
            />
          </>
        );
    }
  };

  useEffect(() => {
    localStorage.setItem(
      'accessToken',
      //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzU4LCJ0ZWFtSWQiOiIxMy0zIiwiaWF0IjoxNzQ1OTE1NDAxLCJpc3MiOiJzcC1tb2dhem9hIn0.E-JV9Vc5A-Hk3fL6iF7-D2mN5mrVUhtc0-FE7SBZ_pA',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzYxLCJ0ZWFtSWQiOiIxMy0zIiwiaWF0IjoxNzQ1OTE1MjA4LCJpc3MiOiJzcC1tb2dhem9hIn0.LI6K9y5vlvvWSKtGsSgfC-pzOAZJI3kkJUb_q-rfT8o',
    );
    setTokenReady(true);
  }, []);

  return (
    <div className="mt-[30px] px-[20px] md:px-[117px] lg:mx-auto lg:px-0 lg:flex lg:justify-center lg:gap-[70px] max-w-[1340px]">
      <div className="h-auto">
        {profileData ? <Profile profileData={profileData} isMyProfile={true} /> : null}
      </div>
      <div className="w-full flex flex-col">
        <div className="mb-[60px]">
          <span className="text-gray-50 font-semibold text-[18px] lg:text-[20px]">활동 내역</span>
          <div className="mt-[30px] flex gap-[10px]">
            <Activity
              text={
                <>
                  남긴 <br className="md:hidden" />
                  별점 평균
                </>
              }
              icon="/icon/common/star.png"
              dataNumber={4.1}
            />
            <Activity text="남긴 리뷰" icon="/icon/common/bubble.png" dataNumber={125} />
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
        </div>
        <div className="w-full h-auto">
          <DropDown
            useBaseStyle={false}
            onChange={handleDropDown}
            divClassName="w-[150px] lg:hidden"
            textClassName="text-gray-50 font-semibold text-[18px]"
            value=""
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
          <div className="mt-[54px] w-full h-auto grid grid-cols-2 gap-[15px] lg:grid-cols-3 lg:gap-5">
            <ReviewedProducts />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
