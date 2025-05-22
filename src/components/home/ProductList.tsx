import { useProductList } from '@/hooks/useProductList';
import Product from '@/components/home/Product';
import { Product as ProductType } from '@/types/product';
import ProductSkeleton from '@/components/home/ProductSkeleton';

interface Props {
  order: 'reviewCount' | 'rating' | string;
  onProductClick: (product: ProductType) => void;
}

const ProductList = ({ order, onProductClick }: Props) => {
  const { data, isLoading } = useProductList({ order });
  const products = data?.list ?? [];
  const skeletonCount = products.length || 6;

  return (
    <ul className="grid grid-cols-2 lg:grid-cols-[repeat(3,minmax(165px,300px))] justify-center gap-[15px] lg:gap-5 w-full">
      {isLoading
        ? // 로딩 중엔 skeletonCount 개수만큼 스켈레톤 직접 렌더
          Array.from({ length: skeletonCount }).map((_, idx) => <ProductSkeleton key={idx} />)
        : // 로딩 완료 후 실제 제품 리스트 렌더
          products.map((product) => (
            <Product key={product.id} product={product} onClick={() => onProductClick(product)} />
          ))}
    </ul>
  );
};

export default ProductList;
