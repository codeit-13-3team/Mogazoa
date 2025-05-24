import { useRouter } from 'next/router';
import ProductDetailLayout from '@/components/products/ProductDetailLayout';

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <div>로딩 중...</div>;
  }

  return <ProductDetailLayout id={parseInt(id as string)} />;
}
