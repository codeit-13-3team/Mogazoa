import React from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, error, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-white">{label}</label>
      <div
        className={clsx(
          'p-[1px] rounded-md bg-transparent transition',
          !error &&
            'focus-within:bg-gradient-to-r focus-within:from-main-blue focus-within:to-main-indigo',
          error && 'bg-red',
        )}
      >
        <input
          ref={ref}
          {...props}
          className={clsx(
            'border rounded-md w-full px-2 py-2 outline-none bg-black-400 text-white',
            error ? 'border-red' : 'border-gray-500',
          )}
        />
      </div>
      {error && <p className="text-red text-sm ">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
