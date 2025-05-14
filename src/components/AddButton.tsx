import { useModal } from '@/context/ModalContext';
import Image from 'next/image';
import plus from '../../public/icon/common/plus.png';
import CreateProduct from './ProductForm';

const FloatingAddButton = () => {
  const { openModal } = useModal();

  return (
    <div className="fixed lg:bottom-[40px] bottom-[80px] left-1/2 -translate-x-1/2 w-full max-w-[1554px] px-5 pointer-events-none">
      <div className="relative w-full pointer-events-auto">
        <button
          className="absolute right-0 lg:bottom-[40px] w-[60px] h-[60px] rounded-full flex justify-center items-center bg-gradient-to-r from-main-blue to-main-indigo shadow-lg"
          aria-label="상품 추가"
          onClick={() => openModal(<CreateProduct />)}
        >
          <Image src={plus} width={40} height={40} alt="상품 추가 버튼" />
        </button>
      </div>
    </div>
  );
};

export default FloatingAddButton;
