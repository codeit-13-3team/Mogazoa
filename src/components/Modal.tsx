import { createPortal } from 'react-dom';
import Image from 'next/image';
import { CSSProperties, useEffect, useState } from 'react';
import closeButton from '../../public/icon/common/close.png';
import Button from './button/Button';

type Props = {
  children: React.ReactNode;
  buttonText?: string;
  containerStyle?: CSSProperties;
  buttonProps?: Omit<React.ComponentProps<typeof Button>, 'children'>;
  onClose: () => void;
};

function Modal({ children, buttonText, containerStyle, buttonProps, onClose }: Props) {
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
      <div className="fixed inset-0 bg-[#000000]/70 z-40" />
      <div className="flex justify-center items-center fixed inset-0 z-50">
        <div
          className="relative flex flex-col bg-black-500 w-[335px] h-auto rounded-xl md:w-[590px] md:rounded-2xl lg:w-[620px]"
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
          <div className="flex flex-col flex-1 justify-center items-center w-full px-5 pt-5 overflow-hidden md:px-10 md:pt-10">
            <div className="flex-1 w-full">{children}</div>
            {buttonText && (
              <Button className="w-full mb-5 md:mb-8 mt-5 md:mt-10" {...buttonProps}>
                {buttonText}
              </Button>
            )}
          </div>
        </div>
      </div>
      ,
    </>,
    modalRoot,
  );
}

export default Modal;
