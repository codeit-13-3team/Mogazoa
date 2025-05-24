import Button from '../button/Button';

export interface ProductDetailButtonGroupProps {}

export default function ProductDetailButtonGroup({}: ProductDetailButtonGroupProps) {
  return (
    <section className="flex flex-col md:flex-row gap-4 w-full">
      <Button
        size="l"
        variant="primary"
        className="w-full flex-[2] py-[15.5px] md:py-[18px] lg:py-[22px] rounded-[8px] bg-gradient-to-r from-main-blue to-main-indigo text-gray-50"
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
    </section>
  );
}
