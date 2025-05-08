import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, error, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-white">{label}</label>
      <input
        ref={ref}
        {...props}
        className={`border rounded px-3 py-2 outline-none  ${error ? 'border-red' : 'border-gray-500'}
         focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
      />
      {error && <p className="text-red text-sm ">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input'; // forwardRef
export default Input;
