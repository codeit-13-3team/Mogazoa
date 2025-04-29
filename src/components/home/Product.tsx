import { useQuery } from '@tanstack/react-query';
import { getProductList } from '@/api/products';
import star from '../../../public/icon/icon/status=star_300.png';
import Image from 'next/image';

const Product = () => {
  const {
    data: productList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['productList'],
    queryFn: getProductList,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;
  if (!productList) return <div>데이터가 없습니다.</div>;

  return (
    <ul className="grid grid-cols-2 lg:grid-cols-[repeat(3,minmax(0,300px))] justify-center gap-[15px] lg:gap-5 w-full">
      {productList?.list?.map((product) => (
        <li
          key={product.id}
          className="p-[10px] border border-black-300 bg-black-400 rounded-[8px] lg:max-w-[300px] w-full"
        >
          <div className="flex justify-center aspect-video w-full">
            <Image
              src={product.image}
              alt="상품 이미지"
              width={135}
              height={100}
              className="object-contain w-auto max-w-[270px] max-h-[200px]"
            />
          </div>
          <div>
            <p className="font-medium block truncate max-w-[15ch]">{product.name}</p>
            <div>
              <p>후기 {product.reviewCount}</p>
              <p>찜 {product.favoriteCount}</p>
            </div>
            <div>
              <Image src={star} alt="별 아이콘" width={12} height={12} />
              <p>{product.rating}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Product;
