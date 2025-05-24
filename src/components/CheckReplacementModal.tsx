import { useModal } from '@/context/ModalContext';
import Modal from './Modal';
import router from 'next/router';

function CheckProductReplace() {
  const { closeModal } = useModal();

  const moveToComparePage = () => {
    closeModal();
    router.push('/compare');
  };

  return (
    <Modal
      containerClassName="md:w-[500px]"
      buttonText="바로가기"
      buttonProps={{ onClick: moveToComparePage }}
    >
      <p className="font-semibold text-gray-50 text-xl lg:text-2xl">
        비교 상품이 교체되었습니다. <br /> 바로 확인해 보시겠어요?
      </p>
    </Modal>
  );
}
export default CheckProductReplace;
