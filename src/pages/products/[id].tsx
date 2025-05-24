import { useRouter } from 'next/router';
import ProductDetailLayout from '@/components/products/ProductDetailLayout';

export default function ProductPage() {
  const { query, isReady } = useRouter();

  if (!isReady) {
    return <div>로딩 중...</div>;
  }

  const rawId = query.id;
  if (!rawId) {
    return <div>잘못된 경로입니다.</div>;
  }

  const idStr = Array.isArray(rawId) ? rawId[0] : rawId;
  const idNum = Number(idStr);
  if (Number.isNaN(idNum)) {
    return <div>잘못된 상품 ID입니다.</div>;
  }

  return <ProductDetailLayout id={idNum} />;
}
