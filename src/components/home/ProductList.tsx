import { useProductList } from '@/hooks/useProductList';
import Product from './Product';
import { Product as ProductType } from '@/types/product';

interface Props {
  order: 'reviewCount' | 'rating' | string;
  onProductClick: (product: ProductType) => void;
  onClick?: () => void;
}

const ProductList = ({ order, onProductClick }: Props) => {
  const { data, isLoading, error } = useProductList({ order });

  return (
    <ul className="grid grid-cols-2 lg:grid-cols-[repeat(3,minmax(165px,300px))] justify-center gap-[15px] lg:gap-5 w-full">
      {data?.list?.map((product) => (
        <Product key={product.id} product={product} onClick={() => onProductClick(product)} />
      ))}
    </ul>
  );
};

export default ProductList;
