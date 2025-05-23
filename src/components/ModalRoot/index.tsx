import { useModal } from '@/context/ModalContext';
import Modal from '@/components/Modal'; // 이미 작성된 모달 컴포넌트

const ModalRoot = () => {
  const { content, isOpen } = useModal();

  if (!isOpen || !content) return null;

  return <Modal>{content}</Modal>;
};

export default ModalRoot;
