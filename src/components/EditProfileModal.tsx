import Modal from '@/components/Modal';
import { useState } from 'react';
import Textarea from '@/components/Textarea';
import ImageUploader from '@/components/ImageUploader';
import Button from '@/components/button/Button';
import { patchMyProfile } from '@/api/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GetMeResponse } from '@/types/user';

interface EditProfileModalProp {
  profileData: GetMeResponse;
  onClose: () => void;
}

function EditProfileModal({ profileData, onClose }: EditProfileModalProp) {
  const [inputText, setInputText] = useState<string>(profileData.nickname);
  const [textarea_Text, setTextarea_Text] = useState<string>(profileData.description);
  const [imageUrl, setImageUrl] = useState<string>(profileData.image);

  const queryClient = useQueryClient();

  const patchMyProfileMutation = useMutation({
    mutationFn: ({
      description,
      nickname,
      image,
    }: {
      description: string;
      nickname: string;
      image: string;
    }) => patchMyProfile(description, nickname, image),
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col gap-5 md:gap-10">
        <span className="mt-5 text-xl font-semibold text-gray-50 lg:text-2xl">프로필 편집</span>
        <div className="flex flex-col gap-[10px] md:gap-[15px] lg:gap-5">
          <ImageUploader
            image={imageUrl}
            onUploadImage={(url) => setImageUrl(url)}
            onRemoveImage={() => setImageUrl('')}
          />
          <input
            className="w-full h-[55px] px-5 outline-none rounded-lg bg-black-400 border border-black-300 caret-white text-white text-[14px] font-normal md:h-[60px] lg:h-[70px] md:font-[16px]"
            placeholder="닉네임을 입력해 주세요"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <Textarea value={textarea_Text} onChange={(e) => setTextarea_Text(e.target.value)} />
        </div>
        <Button
          className="w-full mb-5 md:mb-8 mt-5 md:mt-10"
          onClick={() =>
            patchMyProfileMutation.mutate({
              description: textarea_Text,
              nickname: inputText,
              image: imageUrl,
            })
          }
        >
          저장하기
        </Button>
      </div>
    </Modal>
  );
}

export default EditProfileModal;
