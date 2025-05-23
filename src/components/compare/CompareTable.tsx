import { Product } from '@/types/product';
import { useEffect, useMemo } from 'react';

interface TableProps {
  productA: Product | undefined;
  productB: Product | undefined;
  onTotalsChange?: (totals: { A: number; B: number }) => void;
}

const CompareTable = ({ productA, productB, onTotalsChange }: TableProps) => {
  const criteria = useMemo(
    () => [
      { label: '별점', key: 'rating' as const },
      { label: '리뷰 개수', key: 'reviewCount' as const },
      { label: '찜 개수', key: 'favoriteCount' as const },
    ],
    [],
  );

  const totals = useMemo(() => {
    let A = 0,
      B = 0;
    criteria.forEach(({ key }) => {
      const aVal = productA?.[key] ?? 0;
      const bVal = productB?.[key] ?? 0;
      if (aVal > bVal) A++;
      if (bVal > aVal) B++;
    });
    return { A, B };
  }, [productA, productB, criteria]);

  useEffect(() => {
    if (onTotalsChange) {
      onTotalsChange(totals);
    }
  }, [totals, onTotalsChange]);

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full bg-black-400 text-gray-100 rounded-lg overflow-hidden text-center font-normal">
        <thead>
          <tr>
            <th className="px-4 py-[15px] font-normal">기준</th>
            <th className="px-4 py-[15px] font-normal">상품 1</th>
            <th className="px-4 py-[15px] font-normal">상품 2</th>
            <th className="px-4 py-[15px] font-normal">결과</th>
          </tr>
        </thead>
        <tbody>
          {criteria.map(({ label, key }) => {
            const aVal = productA?.[key] ?? 0;
            const bVal = productB?.[key] ?? 0;
            const result = aVal === bVal ? '무승부' : aVal > bVal ? '상품 1 승리' : '상품 2 승리';
            const colorClass =
              aVal === bVal ? 'text-gray-50' : aVal > bVal ? 'text-green' : 'text-pink';

            return (
              <tr key={key} className="border-t border-black-300">
                <td className="px-4 py-[15px]">{label}</td>
                <td className="text-gray-50 px-4 py-[15px]">{aVal}</td>
                <td className="text-gray-50 px-4 py-[15px]">{bVal}</td>
                <td className={`font-medium px-4 py-[15px] ${colorClass}`}>{result}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CompareTable;
