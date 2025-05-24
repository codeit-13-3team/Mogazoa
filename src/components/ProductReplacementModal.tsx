import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '@/api/products';
import { Product } from '@/types/product';
import { useModal } from '@/context/ModalContext';
import Button from './button/Button';
import CheckProductReplace from './CheckReplacementModal';
import Modal from './Modal';

type productDetailProps = {
  productId: number;
};

function ProductReplace({ productId }: productDetailProps) {
  const { openModal } = useModal();
  const [productA, setProductA] = useState<Product | null>();
  const [productB, setProductB] = useState<Product | null>();
  const [selectedProduct, setSelectedProduct] = useState<string>('');

  const buttonStyles =
    'w-full focus:outline-none focus:ring-0 focus:border-2 focus:border-pink focus:text-pink';

  const modalButtonClick = (props: Product, selectedProduct: string) => {
    if (selectedProduct === '') {
      alert('교체할 상품을 선택해 주세요.');
      return;
    }
    openModal(<CheckProductReplace replaceProduct={props} selectedProduct={selectedProduct} />);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['productDetail', productId],
    queryFn: () => getProductById(productId),
  });

  useEffect(() => {
    try {
      const productA = JSON.parse(localStorage.getItem('productA')!);
      const productB = JSON.parse(localStorage.getItem('productB')!);

      setProductA(productA);
      setProductB(productB);
    } catch (error) {
      console.error(error);
    }
  }, []);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;
  if (!data) return <div>상품 정보를 불러오지 못했습니다.</div>;

  return (
    <Modal
      buttonText="교체하기"
      buttonProps={{ onClick: () => modalButtonClick(data, selectedProduct) }}
    >
      <div className="font-semibold text-xl text-gray-50 lg:text-2xl mb-[30px] md:mb-10">
        지금 보신 ‘{data.name}’ <br /> 어떤 상품과 비교할까요?
      </div>
      {productA && (
        <Button
          onClick={() => setSelectedProduct('productA')}
          variant="tertiary"
          className={`${buttonStyles} mb-[10px] md:mb-[15px] lg:mb-5`}
        >
          {productA.name}
        </Button>
      )}
      {productB && (
        <Button
          onClick={() => setSelectedProduct('productB')}
          variant="tertiary"
          className={buttonStyles}
        >
          {productB.name}
        </Button>
      )}
    </Modal>
  );
}

export default ProductReplace;
