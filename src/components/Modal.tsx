import { createPortal } from 'react-dom';
import Image from 'next/image';
import { CSSProperties, useEffect, useState } from 'react';
import closeButton from '../../public/icon/common/close.png';
import Button from './button/Button';

type Props = {
  containerStyle?: CSSProperties;
  children: React.ReactNode;
  buttonText?: string;
  onClose: () => void;
};

function Modal({ children, buttonText, containerStyle, onClose }: Props) {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    setModalRoot(document.getElementById('modal-root'));
  }, []);

  if (!modalRoot) return null;

  return createPortal(
    <>
      <div className="fixed inset-0 bg-black-500/50 z-40" />
      <div className="flex flex-col justify-center items-center fixed inset-0 z-50">
        <div
          className="relative flex flex-col bg-black-500 w-[335px] h-[578px] rounded-xl md:w-[590px] md:h-[600px] md:rounded-2xl lg:w-[620px]"
          style={containerStyle}
        >
          <button
            onClick={onClose}
            className="absolute top-[15px] right-[15px] md:top-5 md:right-5"
          >
            <Image
              src={closeButton}
              alt="닫기 버튼"
              className="w-6 h-6 md:w-9 md:h-9 lg:w-10 lg:h-10"
            />
          </button>
          <div className="flex flex-col flex-1 justify-center items-center w-full px-5 pt-10 overflow-hidden md:px-10 md:pt-[60px]">
            <div className="flex-1 overflow-auto w-full min-h-0">{children}</div>
            {buttonText && <Button className="w-full mb-5 md:mb-8">{buttonText}</Button>}
          </div>
        </div>
      </div>
      ,
    </>,
    modalRoot,
  );
}

export default Modal;
