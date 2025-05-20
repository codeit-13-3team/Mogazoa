const CategorySkeleton = () => {
  const baseClasses = 'max-w-[220px] w-full md:w-[180px] lg:w-[220px]';

  return (
    <div className={`${baseClasses} hidden md:block`}>
      <div className="mt-[45px]" />
      <ul>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((index) => (
          <li
            key={index}
            className="my-1 h-[45px] lg:h-[50px] bg-black-300 animate-pulse rounded-md"
          />
        ))}
      </ul>
    </div>
  );
};

export default CategorySkeleton;
