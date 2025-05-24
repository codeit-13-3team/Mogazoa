import { ProductResponse } from '@/types/product';
import Button from '../button/Button';
import { useModal } from '@/context/ModalContext';
import ProductReview from '../ProductReviewModal';

export interface ProductDetailButtonGroupProps {
  product: ProductResponse;
}

export default function ProductDetailButtonGroup({ product }: ProductDetailButtonGroupProps) {
  const user = JSON.parse(localStorage.getItem('user')!);
  const { openModal } = useModal();

  const createReview = () => {
    openModal(<ProductReview productId={product.id} />);
  };

  return (
    <section className="flex flex-col md:flex-row gap-4 w-full">
      <Button
        size="l"
        variant="primary"
        className="w-full flex-[2] py-[15.5px] md:py-[18px] lg:py-[22px] rounded-[8px] bg-gradient-to-r from-main-blue to-main-indigo text-gray-50"
        onClick={createReview}
      >
        리뷰 작성하기
      </Button>
      <Button
        size="l"
        variant="tertiary"
        className="w-full flex-[1] py-[15.5px] md:py-[18px] lg:py-[22px] rounded-[8px] border border-main-blue text-main-blue bg-black-500"
      >
        비교하기
      </Button>
      {product.writerId === user?.id && (
        <Button
          size="l"
          variant="tertiary"
          className="w-full flex-[1] py-[15.5px] md:py-[18px] lg:py-[22px] rounded-[8px] border border-gray-100 text-gray-100 bg-black-500"
        >
          편집하기
        </Button>
      )}
    </section>
  );
}
