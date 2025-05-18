'use client';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

const baseStyles = 'flex items-center justify-center font-semibold transition-all duration-150';
const sizeStyles = {
  l: 'w-[640px] h-[65px] text-base rounded-[8px]',
  m: 'w-[440px] h-[55px] text-base rounded-[8px]',
  s: 'w-[335px] h-[50px] text-base rounded-[8px]',
};
const variantStyles = {
  primary:
    'bg-gradient-to-r from-main-blue to-main-indigo text-white border-2 border-black-300 hover:opacity-90',
  secondary: 'bg-black-400 text-white border-none hover:opacity-90',
  tertiary: 'bg-transparent text-gray-200 border-2 border-gray-200 hover:opacity-90',
};
const borderWrapperStyles = {
  secondary: 'inline-block p-[2px] rounded-[8px] bg-gradient-to-r from-main-blue to-main-indigo',
  tertiary: '',
};
const disabledStyles = 'opacity-50 cursor-not-allowed pointer-events-none';

type ButtonSize = 'l' | 'm' | 's';
type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  disabled?: boolean;
  children: ReactNode;
}

const Button = ({
  size = 'm',
  variant = 'primary',
  className,
  disabled = false,
  children,
  ...props
}: ButtonProps) => {
  const buttonClass = twMerge(
    clsx(
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
      className,
      disabled && disabledStyles,
    ),
  );

  if (variant === 'secondary') {
    return (
      <span className={borderWrapperStyles.secondary}>
        <button
          className={twMerge(buttonClass, 'bg-black-400 text-white rounded-[8px] w-full h-full')}
          disabled={disabled}
          {...props}
        >
          {children}
        </button>
      </span>
    );
  }

  return (
    <button className={buttonClass} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;
