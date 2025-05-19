import Modal from '@/components/Modal';
import { useState } from 'react';
import Textarea from '@/components/Textarea'
import ImageUploader from '@/components/ImageUploader';

interface EditProfileModalProp {
  onClose: () => void;
}

function EditProfileModal({ onClose }: EditProfileModalProp) {
  const [inputText, setInputText] = useState<string>('');
  const [textarea_Text, setTextarea_Text] = useState<string>('');

  return (
    <Modal buttonText="저장하기" onClose={onClose}>
      <div className="flex flex-col gap-5 md:gap-10">
        <span className="mt-5 text-xl font-semibold text-gray-50 lg:text-2xl">
          프로필 편집
        </span>
        <div className="flex flex-col gap-[10px] md:gap-[15px] lg:gap-5">
          <ImageUploader image='' onUploadImage={() => {}} onRemoveImage={() => {}}/>
          <input
            className="w-full h-[55px] px-5 outline-none rounded-lg bg-black-400 border border-black-300 caret-white text-white text-[14px] font-normal md:h-[60px] lg:h-[70px] md:font-[16px]"
            placeholder="닉네임을 입력해 주세요"
            onChange={(e) => setInputText(e.target.value)}
          />
          <Textarea onChange={(e) => setTextarea_Text(e.target.value)} />
        </div>
      </div>
    </Modal>
  );
}

export default EditProfileModal;
