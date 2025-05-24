import Image from 'next/image';
import FullStar from '../../../public/icon/common/star.png';
import Hearth from '../../../public/icon/common/save.png';
import Review from '../../../public/icon/common/bubble.png';

export interface StatisticCardProps {
  value: string | number | undefined;
  label: string;
}

export default function StatisticCard({ value, label }: StatisticCardProps) {
  return (
    <section className="bg-black-400 rounded-xl border border-black-300 py-[30px] h-[120px] flex flex-col items-center justify-center">
      <div className="text-[14px] md:text-[16px] lg:text-[18px] text-gray-50 mb-[15px] lg:mb-[20px]">
        {label}
      </div>
      <div className="flex items-center gap-[5px]">
        {label === '별점 평균' ? (
          <Image src={FullStar} alt="별점 아이콘" width={19} height={19} />
        ) : label === '찜' ? (
          <Image src={Hearth} alt="찜 아이콘" width={19} height={19} />
        ) : (
          <Image src={Review} alt="리뷰 아이콘" width={19} height={19} />
        )}

        <div className="text-gray-100 font-light text-[16px]">{value}</div>
      </div>
    </section>
  );
}
