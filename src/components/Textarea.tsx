import { ComponentPropsWithoutRef, useEffect, useState } from 'react';

type TextareaProps = ComponentPropsWithoutRef<'textarea'> & {
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  containerClassName?: string;
  maxLength: number;
};

function Textarea({ onChange, containerClassName, maxLength, value, ...props }: TextareaProps) {
  const [text, setText] = useState<string>((value as string) ?? '');

  useEffect(() => {
    setText((value as string) ?? '');
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    onChange?.(e);
  };

  return (
    <div className={`relative mt-[10px] md:mt-[15px] lg:mt-5 ${containerClassName}`}>
      <div className="p-px rounded-lg bg-black-300 focus-within:bg-gradient-to-r focus-within:from-main-blue focus-within:to-main-indigo">
        <div className="rounded-lg bg-black-500">
          <textarea
            maxLength={maxLength}
            value={text}
            onChange={handleChange}
            {...props}
            className="w-full h-[120px] resize-none rounded-lg outline-none p-5 font-normal text-sm text-gray-50 bg-black-500 placeholder:text-gray-200 leading-5 md:h-[160px] md:text-base lg:leading-[22px]"
            placeholder="리뷰를 작성해 주세요."
          />
        </div>
      </div>
      <div className="absolute bottom-5 right-5 font-normal text-sm text-gray-200">
        {text.length}/{maxLength}
      </div>
    </div>
  );
}

export default Textarea;
