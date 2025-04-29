import Category from '@/components/home/Category';
import Product from '@/components/home/Product';
import ReviewerRanking from '@/components/home/ReviewerRanking';

const Index = () => {
  return (
    <div className="bg-black-500 text-gray-50 flex h-screen w-full">
      <div className="mx-auto w-full flex justify-center">
        <Category />

        <div className="flex min-w-0 flex-col lg:flex-row-reverse gap-[10px]">
          <div className="flex flex-col mb-[60px] lg:border-l-[1px] lg:border-black-400 lg:pl-[30px] lg:h-screen pt-[30px] px-5">
            <p className="text-[14px] mb-5">리뷰어 랭킹</p>
            <div className="overflow-x-auto w-full">
              <ReviewerRanking />
            </div>
          </div>

          <div className="lg:pl-[90px] lg:pr-[60px] md:px-[30px] px-5 max-w-[1200px] w-full flex-1 min-w-0">
            <p className="text-[20px] font-semibold mb-[30px] text-gray-50 lg:pt-[60px]">
              지금 핫한 상품 TOP 6
            </p>
            <Product />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
