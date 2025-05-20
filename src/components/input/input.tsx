import React from 'react';
import clsx from 'clsx';
import close from '../../../public/icon/common/close.png';
import { Product } from '@/types/product';
import Image from 'next/image';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
  ProductA?: Product;
  ProductB?: Product;
  deleteProductA?: (product: Product) => void;
  deleteProductB?: (product: Product) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, className, ProductA, ProductB, deleteProductA, deleteProductB, ...props },
    ref,
  ) => {
    return (
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-50">{label}</label>
        <div
          className={clsx(
            'w-full p-[1px] rounded-md bg-transparent',
            !error &&
              'focus-within:bg-gradient-to-r focus-within:from-main-blue focus-within:to-main-indigo',
            error && 'bg-red',
          )}
        >
          <input
            ref={ref}
            {...props}
            className={clsx(
              'p-[1px] rounded-md bg-transparent transition',
              !error &&
                'focus-within:bg-gradient-to-r focus-within:from-main-blue focus-within:to-main-indigo',
              error && 'bg-red',
            )}
          />
          <div className="relative">
            <input
              ref={ref}
              {...props}
              className={clsx(
                `border rounded-md w-full px-5 py-[19px] lg:py-[25.5px] max-h-[55px] lg:max-h-[70px] h-full outline-none bg-black-400 text-gray-50 ${className} text-[14px]/100 lg:text-[16px]/100 `,
                error ? 'border-red' : 'border-black-300',
              )}
              disabled={!!ProductA}
            />

            {ProductA && (
              <div className="flex items-center bg-[#05D58B1A] rounded-[6px] absolute left-[15px] lg:left-5 top-[10px] lg:top-[18px] py-2 px-[10px] text-[14px] leading-[14px]">
                <span className="mr-[10px] text-green">{ProductA.name}</span>
                <button
                  className="bg-[#00000080] rounded-[6px] p-[2px]"
                  onClick={() => deleteProductA?.(ProductA)}
                >
                  <Image
                    src={close}
                    width={13}
                    height={13}
                    alt="상품 삭제 아이콘"
                    className="md:w-[15px] md:h-[15px]"
                  />
                </button>
              </div>
            )}

            {ProductB && (
              <div className="flex items-center bg-[#FF2F9F1A] rounded-[6px] absolute left-[15px] lg:left-5 top-[10px] lg:top-[18px] py-2 px-[10px] text-[14px] leading-[14px]">
                <span className="mr-[10px] text-pink">{ProductB.name}</span>
                <button
                  className="bg-[#00000080] rounded-[6px] p-[2px]"
                  onClick={() => deleteProductB?.(ProductB)}
                >
                  <Image
                    src={close}
                    width={13}
                    height={13}
                    alt="상품 삭제 아이콘"
                    className="md:w-[15px] md:h-[15px]"
                  />
                </button>
              </div>
            )}
          </div>
        </div>
        {error && <p className="text-red text-sm ">{error}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';
export default Input;
