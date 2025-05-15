import Button from '@/components/button/Button';
import Input from '@/components/input/input';
import Image from 'next/image';
import loadingSmall from '../../public/icon/loading/lodingS.png';
import CompareTable from '@/components/compare/CompareTable';

const Compare = () => {
  return (
    <>
      <div className="flex flex-col items-center justity-center mx-auto w-full max-w-[940px]">
        <div className="flex flex-col gap-8 w-full md:flex-row md:items-end md:justify-center">
          <div className="w-full">
            <Input label="상품 1" className="w-full bg-red" />
          </div>
          <div className="w-full">
            <Input label="상품 2" className="w-full bg-red" />
          </div>

          <Button className="w-full md:max-w-[200px]">비교하기</Button>
        </div>

        <div className="py-24 md:py-[140px] text-center w-full">
          {/* <Image src={loadingSmall} alt="로딩 아이콘" width={79} height={73} /> */}
          <div className="mb-10 md:mb-20">
            <p className="text-[20px] lg:text-[24px] font-semibold text-gray-50 mb-5">
              <span className="text-pink">Air Pods Max</span> 상품이
              <span className="lg:hidden">
                <br />
              </span>
              승리하였습니다.
            </p>
            <span className="text-[12px] text-gray-100">
              3가지 항목 중 2가지 항목에서 우세합니다.
            </span>
          </div>

          <CompareTable />
        </div>
      </div>
    </>
  );
};

export default Compare;
