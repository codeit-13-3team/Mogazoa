import Image from "next/image";

type ActivityProps = {
  text: React.ReactNode | string;
  icon?: string;
  dataNumber?: number;
  category?: string;
};

function Activity({ text, icon, dataNumber, category }: ActivityProps) {
  return (
    <div className="w-full aspect-[9/10] flex bg-black-400 border border-black-300 rounded-[8px] md:aspect-[10/7] lg:aspect-[5/3]">
      <div className="w-full h-full flex flex-col items-center justify-center gap-[15px]">
        <span className="block text-center text-sm font-medium text-gray-100 lg:text-base">
          {text}
        </span>
        {icon ? (
          <div className="flex items-center gap-[5px]">
            <div className="relative w-5 h-5 md:w-6 md:h-6 lg:w-[29px] lg:h-[29px]">
              <Image
                src={icon}
                alt="아이콘"
                fill
                sizes="(max-width: 767px) 20px (max-width: 1023px) 24px, (min-width: 1024px) 29px"
              />
            </div>
              <span className="text-xl font-normal text-gray-50 leading-[100%] lg:text-2xl">
                {dataNumber ?? null}
              </span>
          </div>
        ) : null}
        {category ? (
          <div className="flex items-center justify-center">
            <div className="relative w-[58px] h-5 md:h-6 lg:w-[83px] lg:h-[29px]">
              <Image src={category} alt="카테고리" fill />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Activity;