import Image from 'next/image';
import React, { ReactNode, useEffect, useRef, useState } from 'react';

interface DropDownProps {
  divClassName?: string;
  textClassName?: string;
  useBaseStyle?: boolean;
  children: ReactNode;
  onChange: (value: string | number) => void;
}

interface DropDownOptionProps {
  children: ReactNode;
  value: string | number;
  useBaseStyle?: boolean;
  onSelect?: (value: string | number, optionText: string) => void;
}

export function DropDownOption({ children, value, useBaseStyle, onSelect }: DropDownOptionProps) {
  return (
    <li
      value={value}
      className={`py-[6px] text-gray-200 hover:text-gray-50 hover:bg-gray-100 cursor-pointer transition ${useBaseStyle ? 'px-[10px] rounded-lg' : ''}`}
      onClick={() => onSelect?.(value, String(children))}
    >
      {children}
    </li>
  );
}

export function DropDown({
  divClassName,
  textClassName,
  useBaseStyle = true,
  children,
  onChange,
}: DropDownProps) {
  const [isOpen, setIsopen] = useState<boolean>(false);
  const [iconSrc, setIconsrc] = useState<string>('/icon/common/dropdown.png');
  const [categoryName, setCategoryName] = useState<string>('');

  const baseStyle = `px-5 bg-black-400 border border-black-300 rounded-lg + ${isOpen ? 'border-main-blue' : 'border-black-300'}`;

  const dropDownRef = useRef<HTMLDivElement>(null);

  function handleOutsideClick(e: MouseEvent) {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target as Node)) setIsopen(false);
  }

  function handleSelect(value: string | number, optionText: string) {
    setCategoryName(optionText);
    onChange(value);
    setIsopen(false);
  }

  const ShowDropDownOptions = () => {
    if (!isOpen) return;
    else
      return (
        <ul
          className={`mt-1 w-full absolute top-full left-0 z-10 flex flex-col gap-[5px] bg-black-400 border border-black-300 
            ${useBaseStyle ? 'px-[10px] py-[10px] rounded-lg' : ''}`}
        >
          {React.Children.map(children, (child) => {
            if (React.isValidElement<DropDownOptionProps>(child))
              return React.cloneElement(child, {
                useBaseStyle: useBaseStyle,
                onSelect: handleSelect,
              });
          })}
        </ul>
      );
  };

  useEffect(() => {
    if (isOpen) {
      setIconsrc('/icon/common/dropup.png');
      document.addEventListener('click', handleOutsideClick);
    } else {
      setIconsrc('/icon/common/dropdown.png');

      if (categoryName.length === 0) {
        const childrenArray = React.Children.toArray(children);
        const firstChildren = childrenArray[0];
        if (React.isValidElement<DropDownOptionProps>(firstChildren)) {
          const first_DropDownOption = firstChildren;
          setCategoryName(String(first_DropDownOption.props.children));
        }
      }

      document.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen, children, categoryName, handleOutsideClick]);

  return (
    <div
      className={`relative flex items-center cursor-pointer ${useBaseStyle ? baseStyle : ''} ${divClassName}`}
    >
      <div
        ref={dropDownRef}
        className="w-full h-6 flex justify-between items-center md:h-[22px]"
        onClick={() => setIsopen(!isOpen)}
      >
        <span
          className={`${useBaseStyle ? (isOpen ? 'text-gray-50' : 'text-gray-200') : ''} ${textClassName}`}
        >
          {categoryName}
        </span>
        <div className="relative w-6 h-6 md:w-[22px] md:h-[22px]">
          <Image
            src={iconSrc}
            alt="dropIcon"
            fill
            sizes="(max-width: 767px) 24px, (min-width: 768px) 22px"
          />
        </div>
      </div>
      <ShowDropDownOptions />
    </div>
  );
}
