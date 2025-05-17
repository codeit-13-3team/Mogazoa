import Button from '@/components/button/Button';
import Input from '@/components/input/input';
import Image from 'next/image';
import loadingSmall from '../../public/icon/loading/lodingS.png';
import CompareTable from '@/components/compare/CompareTable';
import { useDebounce } from '@/hooks/useDebounce';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProductList } from '@/api/products';
import { Product } from '@/types/product';

type totlaType = { A: number; B: number };

const Compare = () => {
  const [productAName, setProductAName] = useState<string>('');
  const [productA, setProductA] = useState<Product>();
  const [productBName, setProductBName] = useState<string>('');
  const [productB, setProductB] = useState<Product>();
  const [isProductADropdownOpen, setIsProductADropdownOpen] = useState<boolean>(false);
  const [isProductBDropdownOpen, setIsProductBDropdownOpen] = useState<boolean>(false);
  const [totals, setTotals] = useState<totlaType>({ A: 0, B: 0 });
  const debouncedProductASearch = useDebounce(productAName, 300);
  const debouncedProductBSearch = useDebounce(productBName, 300);

  const productARef = useRef<HTMLInputElement>(null);
  const productADropdownRef = useRef<HTMLDivElement>(null);
  const productBRef = useRef<HTMLInputElement>(null);
  const productBDropdownRef = useRef<HTMLDivElement>(null);

  const { data: productAData, isLoading: isProductALoading } = useQuery({
    queryKey: ['search', debouncedProductASearch],
    queryFn: () => getProductList(debouncedProductASearch),
    enabled: !!debouncedProductASearch,
    staleTime: 0,
    gcTime: 0,
  });

  const { data: productBData, isLoading: isProductBLoading } = useQuery({
    queryKey: ['search', debouncedProductBSearch],
    queryFn: () => getProductList(debouncedProductBSearch),
    enabled: !!debouncedProductBSearch,
    staleTime: 0,
    gcTime: 0,
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        productBDropdownRef.current &&
        !productBDropdownRef.current.contains(e.target as Node) &&
        productBRef.current &&
        !productBRef.current.contains(e.target as Node)
      ) {
        setIsProductADropdownOpen(false);
        setIsProductBDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProductA = (item: Product) => {
    setProductA(item);
    setProductAName(item.name);
    setIsProductADropdownOpen(false);
  };
  const handleProductB = (item: Product) => {
    setProductB(item);
    setProductBName(item.name);
    setIsProductBDropdownOpen(false);
  };

  const onTotalsChange = (totals: { A: number; B: number }) => {
    setTotals(totals);
  };

  const colorClass =
    totals.A === totals.B ? 'text-gray-50' : totals.A > totals.B ? 'text-green' : 'text-pink';

  return (
    <div className="py-[30px] px-5">
      <div className="flex flex-col items-center justity-center mx-auto w-full max-w-[940px]">
        <div className="flex flex-col gap-8 w-full md:flex-row md:items-end md:justify-center">
          <div className="w-full">
            <div className="relative">
              <Input
                ref={productARef}
                label="상품 1"
                value={productAName}
                onChange={(e) => {
                  setProductAName(e.target.value);
                  setIsProductADropdownOpen(true);
                }}
                onFocus={() => {
                  if (productAName) setIsProductADropdownOpen(true);
                }}
                placeholder="상품명 (상품 등록 여부를 확인해 주세요)"
              />
              {isProductADropdownOpen && productAData?.list && (
                <div
                  ref={productADropdownRef}
                  className="absolute border border-black-300 bg-black-400 rounded-[8px] text-gray-50 text-[14px] z-50 w-full mt-[5px]"
                >
                  {isProductALoading ? (
                    <p className="text-[14px] md:text-[16px] text-gray-50 bg-red">검색 중...</p>
                  ) : (
                    <ul className="flex flex-col gap-[5px] p-[10px] max-h-[163px] overflow-y-scroll">
                      {productAData?.list?.map((item) => (
                        <li
                          key={item.id}
                          className="py-[6px] px-5 hover:bg-black-300 rounded-[6px] text-[14px] md:text-[16px] cursor-pointer"
                          onClick={() => handleProductA(item)}
                        >
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="w-full">
            <div className="relative">
              <Input
                ref={productBRef}
                label="상품 2"
                value={productBName}
                onChange={(e) => {
                  setProductBName(e.target.value);
                  setIsProductBDropdownOpen(true);
                }}
                onFocus={() => {
                  if (productBName) setIsProductBDropdownOpen(true);
                }}
                placeholder="상품명 (상품 등록 여부를 확인해 주세요)"
              />
              {isProductBDropdownOpen && productBData?.list && (
                <div
                  ref={productBDropdownRef}
                  className="absolute border border-black-300 bg-black-400 rounded-[8px] text-gray-50 text-[14px] z-50 w-full mt-[5px]"
                >
                  {isProductBLoading ? (
                    <p className="text-[14px] md:text-[16px] text-gray-50 bg-red">검색 중...</p>
                  ) : (
                    <ul className="flex flex-col gap-[5px] p-[10px] max-h-[163px] overflow-y-scroll">
                      {productBData?.list?.map((item) => (
                        <li
                          key={item.id}
                          className="py-[6px] px-5 hover:bg-black-300 rounded-[6px] text-[14px] md:text-[16px] cursor-pointer"
                          onClick={() => handleProductB(item)}
                        >
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>

          <Button className="w-full md:max-w-[200px]">비교하기</Button>
        </div>

        <div className="py-24 md:py-[140px] text-center w-full">
          {productA && productB && (
            <div className="mb-10 md:mb-20">
              {totals.A !== totals.B ? (
                <p className="text-[20px] lg:text-[24px] font-semibold text-gray-50 mb-5">
                  <span className={`${colorClass}`}>
                    {totals.A > totals.B ? productA?.name : productB?.name}
                  </span>{' '}
                  상품이
                  <span className="lg:hidden">
                    <br />
                  </span>
                  승리하였습니다.
                </p>
              ) : (
                <p className="text-[20px] lg:text-[24px] font-semibold text-gray-50 mb-5">
                  무승부입니다!
                </p>
              )}
              {totals.A !== totals.B && (
                <span className="text-[12px] text-gray-100">
                  3가지 항목 중 {totals.A > totals.B ? totals.A : totals.B}가지 항목에서 우세합니다.
                </span>
              )}
            </div>
          )}

          {productA && productB ? (
            <CompareTable productA={productA} productB={productB} onTotalsChange={onTotalsChange} />
          ) : (
            <Image src={loadingSmall} alt="로딩 아이콘" width={79} height={73} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Compare;
