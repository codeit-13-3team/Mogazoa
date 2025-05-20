const ProductSkeleton = () => {
  return (
    <li className="bg-black-400 rounded-[8px] lg:max-w-[300px] w-full list-none animate-pulse">
      <div className="flex justify-center p-[10px] pb-[0px] lg:p-2 lg:pb-[0px] aspect-video w-full bg-black-300 animate-pulse rounded-t-[8px]">
        <div className="object-contain w-auto max-w-[270px] max-h-[200px]" />
      </div>
      <div className="p-[10px] md:p-[20px] lg:p-[25px]">
        <div className="animate-pulse bg-black-300 h-[22px] md:h-[29px] lg:[21px] mb-[10px] rounded-md" />

        <div className="flex flex-col md:flex-row gap-[10px] text-[12px] md:text-[14px] lg:text-[16px] font-light text-gray-200 justify-between">
          <div className="flex gap-[10px]">
            <div className="flex gap-[5px] flex-shrink-0">
              <div className="h-[14px] w-[21px] md:h-[17px] md:w-[25px] lg:w-[28px] lg:h-[19px] bg-black-300 animate-pulse rounded-md" />
            </div>
            <div className="flex gap-[5px] flex-shrink-0">
              <div className="w-[11px] h-[14px] md:w-[13px] md:h-[17px] lg:w-[14px] lg:h-[19px] bg-black-300 animate-pulse rounded-md" />
            </div>
          </div>

          <div className="flex items-center gap-[2px]">
            <div className="w-[12px] h-[12px] md:w-[15px] md:h-[15px] lg:w-[16px] lg:h-[16px] bg-black-300 animate-pulse"></div>
            <div className="w-[12px] h-[12px] md:w-[15px] md:h-[15px] lg:w-[16px] lg:h-[16px] bg-black-300 animate-pulse"></div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ProductSkeleton;
