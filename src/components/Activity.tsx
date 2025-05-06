import Image from "next/image";

type ActivityProps = {
  text: React.ReactNode | string;
  icon?: string;
  dataNumber?: number;
  category?: string;
};

function Activity({ text, icon, dataNumber, category }: ActivityProps) {
  return (
    <div className="w-full aspect-[9/10] flex bg-[#252530] border border-[#353542] rounded-[8px] md:aspect-[10/7] lg:aspect-[5/3]">
      <div className="w-full h-full flex flex-col items-center justify-center gap-[15px]">
        <span className="block text-center text-[14px] font-medium text-[#9FA6B2] lg:text-[16px]">
          {text}
        </span>
        {icon ? (
          <div className="flex items-center gap-[5px]">
            <div className="relative w-[20px] h-[20px] md:w-[24px] md:h-[24px] lg:w-[29px] lg:h-[29px]">
              <Image
                src={icon}
                alt="아이콘"
                fill
                sizes="(max-width: 767px) 20px (max-width: 1023px) 24px, (min-width: 1024px) 29px"
              />
            </div>
            {dataNumber ? (
              <span className="text-[20px] font-normal text-[#F1F1F5] leading-[100%] lg:text-[24px]">
                {dataNumber}
              </span>
            ) : null}
          </div>
        ) : null}
        {category ? (
          <div className="flex items-center justify-center">
            <div className="relative w-[58px] h-[20px] md:h-[24px] lg:w-[83px] lg:h-[29px]">
              <Image src={category} alt="카테고리" fill />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Activity;