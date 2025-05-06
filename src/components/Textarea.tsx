import { ComponentPropsWithoutRef, useState } from 'react';

type TextareaProps = ComponentPropsWithoutRef<'textarea'>;

function Textarea({ ...props }: TextareaProps) {
  const [text, setText] = useState('');
  return (
    <div className="relative">
      <textarea
        maxLength={500}
        value={text}
        onChange={(e) => setText(e.target.value)}
        {...props}
        className="w-full h-[120px] resize-none rounded-lg border border-black-300 bg-black-400 outline-none p-5 font-normal text-sm text-gray-50 plaecholder-gray-200 leading-5 mt-[10px] md:h-[160px] md:mt-[15px] md:text-base lg:leading-[22px] lg:mt-5"
      />
      <div className="absolute bottom-5 right-5 font-normal font-sm text-gray-200">
        {text.length}/500
      </div>
    </div>
  );
}

export default Textarea;
