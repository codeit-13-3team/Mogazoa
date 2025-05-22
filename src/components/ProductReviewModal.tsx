import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '@/api/products';
import ImageUploader from './ImageUploader';
import Modal from './Modal';
import Textarea from './Textarea';
import StarRating from './StarRating';

type productDetailProps = {
  productId: number;
};

function ProductReview({ productId }: productDetailProps) {
  const [productImage, setproductImage] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState<number>(0);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['productDetail', productId],
    queryFn: () => getProductById(productId),
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;
  if (!data) return <div>상품 정보를 불러오지 못했습니다.</div>;

  return (
    <Modal onClose={() => setIsOpen(false)} buttonText="작성하기">
      <div>
        <div className="justify-center text-center w-[58px] h-[22px] rounded-[6px] px-2 py-1 font-normal text-xs text-[#23B581] bg-[#23B581]/10 mb-[10px]">
          {data.category.name}
        </div>
        <div className="font-semibold text-gray-50 text-xl lg:text-2xl mb-5 md:mb-10">
          {data.name}
        </div>
      </div>
      <div className="flex items-center gap-[15px] w-[188px] h-7 mb-[10px] md:w-[208px] md:h-8 md:mb-[15px] lg:w-[228px] lg:gap-5 lg:mb-5">
        <p className="font-normal text-gray-200 text-sm lg:text-base whitespace-nowrap">별점</p>
        <StarRating value={rating} onChange={setRating} />
      </div>
      <Textarea containerClassName="mb-[10px] md:mb-[15px] lg:mb-5" maxLength={300} />
      <ImageUploader
        image={productImage}
        onUploadImage={(url) => setproductImage(url)}
        onRemoveImage={() => setproductImage('')}
      />
    </Modal>
  );
}

export default ProductReview;
