const CategorySkeleton = () => {
  const baseClasses =
    'max-w-[220px] w-full md:w-[180px] lg:w-[220px] ' +
    'bg-black-500 flex-shrink-0 ' +
    'transform transition-transform duration-300 ease-in-out';

  return (
    <div className={`${baseClasses}`}>
      <div className="text-4 py-[15px] px-5 mt-[45px]" />
      <ul>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((index) => (
          <li
            key={index}
            className="text-4 my-[15px] cursor-pointer h-[45px] lg:h-[50px] bg-black-300 animate-pulse rounded-md"
          />
        ))}
      </ul>
    </div>
  );
};

export default CategorySkeleton;
