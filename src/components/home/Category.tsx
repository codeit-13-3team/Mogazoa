import { useQuery } from '@tanstack/react-query';
import { getCategoryList } from '@/api/category';
import { Category as CategoryType } from '@/types/category';

const Category = ({
  selectedCategory,
  setSelectedCategory,
  setSelectedCategoryName,
}: {
  selectedCategory: number | null;
  setSelectedCategory: (id: number | null) => void;
  setSelectedCategoryName: (name: string | null) => void;
}) => {
  const {
    data: categoryList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['categoryList'],
    queryFn: getCategoryList,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;
  if (!categoryList) return <div>데이터가 없습니다.</div>;

  const handleCategoryClick = (category: CategoryType) => {
    if (category.id === selectedCategory) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category.id);
      setSelectedCategoryName(category.name);
    }
  };

  return (
    <div className="hidden md:block md:w-[180px] lg:w-[220px] bg-black-500 w-full cursor-pointer">
      <h2 className="text-4 py-[15px] px-5">카테고리</h2>
      <ul>
        {categoryList.map((cat) => (
          <li
            key={cat.id}
            className={`text-4 py-[15px] px-5 ${
              selectedCategory === cat.id
                ? 'bg-black-400 text-gray-50 shadow-[inset_0_0_0_1px_rgba(53,53,66,1)] rounded-[8px]'
                : 'text-gray-200'
            }`}
            onClick={() => handleCategoryClick(cat)}
          >
            {cat.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
