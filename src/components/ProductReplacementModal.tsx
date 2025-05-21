import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Modal from './Modal';
import { getProductById } from '@/api/products';
import Button from './button/Button';

type productDetailProps = {
  productId: number;
};

function ProductReplace({ productId }: productDetailProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const buttonStyles =
    'w-full focus:outline-none focus:ring-0 focus:border-2 focus:border-pink focus:text-pink';

  // 비교 상품 교체 확인 모달이 열리도록 수정 예정입니다.
  const modalButtonClick = () => {
    console.log('교체하기');
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['productDetail', productId],
    queryFn: () => getProductById(productId),
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;
  if (!data) return <div>상품 정보를 불러오지 못했습니다.</div>;

  return (
    <Modal
      containerClassName="w-[335px] md:w-[500px] lg:w-[500px]"
      onClose={() => setIsOpen(false)}
      buttonText="교체하기"
      buttonProps={{ onClick: modalButtonClick }}
    >
      <div className="font-semibold text-xl text-gray-50 lg:text-2xl mb-[30px] md:mb-10">
        지금 보신 ‘{data.name}’ <br /> 어떤 상품과 비교할까요?
      </div>
      <Button variant="tertiary" className={`${buttonStyles} mb-[10px] md:mb-[15px] lg:mb-5`}>
        Air Pods 1
      </Button>
      <Button variant="tertiary" className={buttonStyles}>
        Air Pods Max
      </Button>
    </Modal>
  );
}

export default ProductReplace;
