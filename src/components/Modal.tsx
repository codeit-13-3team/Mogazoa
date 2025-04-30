import { createPortal } from 'react-dom';
import Image from 'next/image';
import closeButton from '../../public/icon/common/close.png';
import { CSSProperties } from 'react';

type Props = {
  children: React.ReactNode;
  style?: CSSProperties;
  buttonText?: string;
  onClose: () => void;
};

function Modal({ children, buttonText, style, onClose }: Props) {
  return createPortal(
    <div className="flex flex-col justify-center items-center fixed inset-0 z-50">
      <div
        className="relative flex flex-col bg-black-500 w-[335px] h-[578px] rounded-xl md:w-[590px] md:h-[600px] md:rounded-2xl lg:w-[620px]"
        style={style}
      >
        <button onClick={onClose} className="absolute top-[15px] right-[15px] md:top-5 md:right-5">
          <Image
            src={closeButton}
            alt="닫기 버튼"
            className="w-6 h-6 md:w-9 md:h-9 lg:w-10 lg:h-10"
          />
        </button>
        <div className="flex flex-col flex-1 justify-center items-center w-full px-5 pt-10 overflow-hidden md:px-10 md:pt-[60px]">
          <div className="flex-1 overflow-auto w-full min-h-0">{children}</div>
          {buttonText && (
            <button
              className="w-[295px] h-[50px] rounded-lg bg-gradient-to-r from-main-blue to-main-indigo font-semibold text-gray-50 text-base mb-5 md:w-[510px] md:h-[55px] md:mb-10 lg:w-[540px] lg:h-15 lg:text-lg"
              style={style}
            >
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement,
  );
}

export default Modal;
