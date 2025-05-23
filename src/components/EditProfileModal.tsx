import Modal from '@/components/Modal';
import { useEffect, useState } from 'react';
import Textarea from '@/components/Textarea';
import ImageUploader from '@/components/ImageUploader';
import Button from '@/components/button/Button';
import { patchMyProfile } from '@/api/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GetMeResponse } from '@/types/user';
import { useModal } from '@/context/ModalContext';

interface ErrorState {
  isError: boolean;
  message?: string;
}

function EditProfileModal({ profileData }: { profileData: GetMeResponse }) {
  const { closeModal } = useModal();
  const [inputText, setInputText] = useState<string>(profileData.nickname);
  const [textarea_Text, setTextarea_Text] = useState<string>(profileData.description);
  const [imageUrl, setImageUrl] = useState<string>(profileData.image);

  const setInitialErrorState: ErrorState = { isError: false, message: '' };
  const [inputError, setInputError] = useState<ErrorState>(setInitialErrorState);

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
      closeModal();
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  function checkInputError(nickname: string) {
    if (nickname.length > 20) {
      setInputError({ isError: true, message: '닉네임을 20자 이내로 작성해주세요.' });
    } else if (nickname.length === 0) {
      setInputError({ isError: true, message: '' });
    } else {
      setInputError(setInitialErrorState);
    }
  }

  useEffect(() => {
    checkInputError(inputText);
    if (!imageUrl) setImageUrl('https://none');
  }, [profileData]);

  return (
    <Modal>
      <div className="flex flex-col gap-5 md:gap-10">
        <span className="mt-5 text-xl font-semibold text-gray-50 lg:text-2xl">프로필 편집</span>
        <div className="flex flex-col gap-[10px] md:gap-[15px] lg:gap-5">
          <ImageUploader
            image={imageUrl === 'https://none' ? '' : imageUrl}
            onUploadImage={(url) => setImageUrl(url)}
            onRemoveImage={() => setImageUrl('https://none')}
          />
          <div>
            <input
              className="w-full h-[55px] px-5 outline-none rounded-lg bg-black-400 border border-black-300 caret-white text-white text-[14px] font-normal md:h-[60px] lg:h-[70px] md:font-[16px]"
              placeholder="닉네임을 입력해 주세요"
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                checkInputError(e.target.value);
              }}
            />
            {inputError.isError && inputError.message ? (
              <span className="text-xs text-red lg:text-sm">{inputError.message}</span>
            ) : null}
          </div>
          <Textarea
            value={textarea_Text}
            onChange={(e) => {
              setTextarea_Text(e.target.value);
            }}
            maxLength={300}
          />
        </div>
        <Button
          className="w-full mb-5 md:mb-8 mt-5 md:mt-10"
          disabled={inputError.isError}
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