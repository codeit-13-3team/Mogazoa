import { DropDown, DropDownOption } from '@/components/DropDown';
import Textarea from '@/components/Textarea';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import photo from '../../../../public/icon/common/photo.png';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@/hooks/useDebounce';
import { createProduct, getProductList, updateProduct } from '@/api/products';
import { getCategoryList } from '@/api/category';
import { ProductResponse, CreateProductRequest } from '@/types/product';
import router from 'next/router';
import { useModal } from '@/context/ModalContext';

interface ProductProps {
  selectedProduct?: ProductResponse | undefined;
}

const CreateProduct = ({ selectedProduct }: ProductProps) => {
  const [productName, setProductName] = useState<string>('');
  const [productDescript, setProductDescript] = useState<string>('');
  const [productCategory, setProductCategory] = useState<string | number>(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const debouncedSearch = useDebounce(productName, 300);
  const productImage = 'https://cdn.pixabay.com/photo/2025/05/04/17/47/dog-9578735_1280.jpg';
  const { closeModal } = useModal();

  const [productNameError, setProductNameError] = useState<string>('');
  const [productDescriptError, setProductDescriptError] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedProduct) {
      setProductName(selectedProduct.name);
      setProductDescript(selectedProduct.description);
      setProductCategory(selectedProduct.categoryId);
    } else {
      setProductName('');
      setProductDescript('');
      setProductCategory(1);
    }
  }, [selectedProduct]);

  const { data: productData, isLoading: isProductLoading } = useQuery({
    queryKey: ['search', debouncedSearch],
    queryFn: () => getProductList(debouncedSearch),
    enabled: !!debouncedSearch,
    staleTime: 0,
    gcTime: 0,
  });

  const { data: categoryData, isLoading: isCategoryLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategoryList,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isDuplicate = productData?.list?.some(
    (product) => product.name === productName && product.id !== selectedProduct?.id,
  );

  const handleProductName = () => {
    if (isDuplicate) {
      setProductNameError('이미 등록된 상품입니다.');
    } else if (!productName) {
      setProductNameError('상품 이름은 필수 입력입니다.');
    } else {
      setProductNameError('');
    }
  };

  const handleProductDescription = () => {
    if (!productDescript) {
      setProductDescriptError('상품 설명은 필수 입력입니다.');
    } else if (productDescript.length < 10) {
      setProductDescriptError('최소 10자 이상 적어주세요.');
    } else {
      setProductDescriptError('');
    }
  };

  const isFormValid =
    !productNameError &&
    !productDescriptError &&
    productName !== '' &&
    productDescript !== '' &&
    productCategory !== 0 &&
    !isDuplicate;

  const handleSubmit = async () => {
    const body: CreateProductRequest = {
      categoryId: productCategory,
      image: productImage,
      description: productDescript,
      name: productName,
    };

    try {
      if (selectedProduct) {
        await updateProduct(selectedProduct.id, body);
        alert('상품이 수정되었습니다.');
        closeModal();
      } else {
        const newProduct = await createProduct(body);
        alert('상품이 추가되었습니다.');
        closeModal();
        router.push(`/product/${newProduct.id}`);
      }
    } catch (err) {
      console.error(err);
      alert('요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <h3 className="text-[20px] font-semibold mb-5 md:mb-10 lg:text-[24px] text-gray-50">
        상품 {selectedProduct ? '편집' : '추가'}
      </h3>
      <div className="flex flex-col gap-[10px] md:flex-row-reverse mg:gap-[15px] md:items-end">
        <div className="flex flex-col gap-[10px]">
          <div className="flex justify-center items-center flex-shrink-0 w-[140px] h-[140px] md:w-[135px] md:h-[135px] rounded-[8px] border border-black-300 bg-black-400">
            <Image src={photo} width={24} height={24} alt="이미지 추가 아이콘" />
          </div>
          {!productImage && <span className="text-red">대표 이미지를 추가해주세요.</span>}
        </div>
        <div className="flex flex-col gap-[10px] w-full md:gap-[15px]">
          <div className="relative">
            <input
              ref={inputRef}
              value={productName}
              onChange={(e) => {
                setProductName(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => {
                if (productName) setIsDropdownOpen(true);
              }}
              onBlur={handleProductName}
              placeholder="상품명 (상품 등록 여부를 확인해 주세요)"
              className="py-[17px] px-5 h-[55px] md:h-[60px] w-full rounded-[8px] border border-black-300 bg-black-400 outline-none text-gray-50 text-[14px]"
            />
            {productNameError && <span className="text-red">{productNameError}</span>}
            {isDropdownOpen && productData?.list && (
              <div
                ref={dropdownRef}
                className="absolute border border-black-300 bg-black-400 rounded-[8px] text-gray-50 text-[14px] z-50 w-full mt-[5px]"
              >
                {isProductLoading ? (
                  <p className="text-[14px] md:text-[16px] text-gray-50 bg-red">검색 중...</p>
                ) : (
                  <ul className="flex flex-col gap-[5px] p-[10px] max-h-[163px] overflow-y-scroll">
                    {productData?.list?.map((item) => (
                      <li
                        key={item.id}
                        className="py-[6px] px-5 hover:bg-black-300 rounded-[6px] text-[14px] md:text-[16px]"
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          <DropDown
            width="100%"
            height="60px"
            textClassName="text-gray"
            value={productCategory}
            onChange={(value) => setProductCategory(value)}
          >
            {categoryData?.map((cat) => (
              <DropDownOption
                value={cat.id}
                key={cat.id}
                onSelect={() => setProductCategory(cat.id)}
              >
                {cat.name}
              </DropDownOption>
            ))}
          </DropDown>
        </div>
      </div>
      <Textarea
        value={productDescript}
        placeholder="상품 설명을 작성해 주세요"
        onChange={(e) => setProductDescript(e.target.value)}
        onBlur={handleProductDescription}
      />
      {productDescriptError && <span className="text-red">{productDescriptError}</span>}

      <button
        className="bg-main-indigo w-full text-gray-50 py-[22px]"
        disabled={!isFormValid}
        onClick={handleSubmit}
      >
        {selectedProduct ? '저장하기' : '추가하기'}
      </button>
    </>
  );
};

export default CreateProduct;
