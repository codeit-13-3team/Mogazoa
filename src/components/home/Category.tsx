import { useQuery } from '@tanstack/react-query';
import { getCategoryList } from '@/api/category';
import { useState } from 'react';

const Category = () => {
  const {
    data: categoryList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['categoryList'],
    queryFn: getCategoryList,
  });

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;
  if (!categoryList) return <div>데이터가 없습니다.</div>;

  const handleCategoryClick = (id: number) => {
    setSelectedCategory(id);
  };

  return (
    <div className="hidden md:block md:w-[180px] lg:w-[220px] bg-black-500 w-full">
      <h2 className="text-4 py-[15px] px-5">카테고리</h2>
      <ul>
        {categoryList.map((cat) => (
          <li
            key={cat.id}
            className={`text-4 py-[15px] px-5 ${
              selectedCategory === cat.id
                ? 'bg-black-400 text-gray-50 shadow-[inset_0_0_0_1px_rgba(53,53,66,1)]'
                : 'text-gray-200'
            }`}
            onClick={() => handleCategoryClick(cat.id)}
          >
            {cat.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
