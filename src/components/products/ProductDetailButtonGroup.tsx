import Button from '../button/Button';

export interface ProductDetailButtonGroupProps {}

export default function ProductDetailButtonGroup({}: ProductDetailButtonGroupProps) {
  return (
    <section className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
      <Button
        size="l"
        variant="primary"
        className="w-full sm:w-[345px] h-[48px] sm:h-[65px] rounded-[8px] text-sm sm:text-base bg-gradient-to-r from-main-blue to-main-indigo text-white"
      >
        리뷰 작성하기
      </Button>
      <Button
        size="l"
        variant="tertiary"
        className="w-full sm:w-[180px] h-[48px] sm:h-[65px] rounded-[8px] border border-main-blue text-main-blue text-sm sm:text-base bg-black-400"
      >
        비교하기
      </Button>
    </section>
  );
}
