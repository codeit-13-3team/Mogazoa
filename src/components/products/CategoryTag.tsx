const CATEGORY_COLOR_MAP: Record<string, string> = {
  음악: 'bg-[#C5D17C1A] text-[#C5D17C]',
  '영화/드라마': 'bg-[#F755321A] text-[#F75532]',
  '강의/책': 'bg-[#A953FF1A] text-[#A953FF]',
  호텔: 'bg-[#49AF1A1A] text-[#49AF1A]',
  '가구/인테리어': 'bg-[#D676C11A] text-[#D676C1]',
  식당: 'bg-[#FF7E461A] text-[#FF7E46]',
  전자기기: 'bg-[#23B5811A] text-[#23B581]',
  화장품: 'bg-[#FD529A1A] text-[#FD529A]',
  '의류/악세서리': 'bg-[#757AFF1A] text-[#757AFF]',
  앱: 'bg-[#3098E31A] text-[#3098E3]',
};

interface CategoryTagProps {
  name?: string;
}

const CategoryTag = ({ name }: CategoryTagProps) => {
  if (!name) return null;

  const colorClasses = CATEGORY_COLOR_MAP[name] ?? 'bg-gray-700 text-gray-200';

  return (
    <span className={`inline-block text-[12px] px-2 py-1 rounded mb-[10px] ${colorClasses}`}>
      {name}
    </span>
  );
};

export default CategoryTag;
