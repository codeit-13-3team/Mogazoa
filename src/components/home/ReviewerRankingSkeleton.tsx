const ReviewerRankingSkeleton = () => {
  return (
    <ul className="w-full flex flex-row flex-nowrap gap-[15px] lg:flex-col lg:overflow-x-auto lg:gap-6">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map((index) => (
        <li key={index} className="flex items-center">
          <div className="bg-gray-300 animate-pulse rounded-full w-9 h-9 mr-[10px]"></div>
          <div className="flex flex-col">
            <div className="flex items-center gap-[5px] mb-[5.5px] flex-shrink-0">
              <div className="w-[27px] h-[18px] py-[2px] px-[6px] rounded-[50px] bg-black-300 animate-pulse" />
              <div className="w-[94px] bg-black-300 animate-pulse h-[17px] rounded-md" />
            </div>
            <div className="flex items-center gap-[10px] text-[10px] text-gray-200 font-light lg:text-[12px]">
              <div className="w-[26px] h-3 bg-black-300 rounded-md" />
              <div className="w-[18px] h-3 bg-black-300 rounded-md" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ReviewerRankingSkeleton;
