import { useProductList } from '@/hooks/useProductList';
import Product from './Product';

interface Props {
  order: 'reviewCount' | 'rating' | string;
  keyword?: string;
  category?: number | null;
}

const ProductList = ({ order, keyword, category }: Props) => {
  const { data, isLoading, error } = useProductList({ order, keyword, category });

  return (
    <ul className="grid grid-cols-2 lg:grid-cols-[repeat(3,minmax(165px,300px))] justify-center gap-[15px] lg:gap-5 w-full">
      {data?.list?.map((product) => <Product key={product.id} product={product} />)}
    </ul>
  );
};

export default ProductList;
