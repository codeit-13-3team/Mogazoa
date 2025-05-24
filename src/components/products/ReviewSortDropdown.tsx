import { useState } from 'react';

export interface Option {
  value: 'recent' | 'ratingDesc' | 'ratingAsc' | 'likeCount';
  label: string;
}

export interface ReviewSortDropdownProps {
  options: readonly Option[];
  value: Option['value'];
  onChange: (value: Option['value']) => void;
}

export default function ReviewSortDropdown({ options, value, onChange }: ReviewSortDropdownProps) {
  const [open, setOpen] = useState(false);
  const selected = options.find((opt) => opt.value === value)?.label || '';

  return (
    <section className="relative w-[160px]">
      <button
        className="flex items-center text-sm text-gray-400 border border-gray-200 rounded px-3 py-1.5 w-full h-[32px] justify-between"
        onClick={() => setOpen((v: any) => !v)}
        type="button"
      >
        {selected}
        <span className="text-xs">▼</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-full bg-black-400 border border-gray-200 rounded shadow-lg z-10">
          {options.map((opt) => (
            <button
              key={opt.value}
              className={`block w-full text-left px-3 py-2 text-sm ${value === opt.value ? 'text-main-indigo' : 'text-gray-400'} hover:bg-gray-700`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              type="button"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
