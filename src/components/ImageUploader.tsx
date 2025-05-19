import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { imageUpload } from '@/api/image';
import ImageIcon from '../../public/icon/common/photo.png';
import deleteIcon from '../../public/icon/common/close.png';

interface imageProps {
  image: string;
  onUploadImage: (url: string) => void;
  onRemoveImage: () => void;
  errorMessage?: string;
}

function ImageUploader({ image, onUploadImage, onRemoveImage, errorMessage }: imageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  useEffect(() => {
    setImageUrl(image || null);
    setError(errorMessage || null);
  }, [image]);

  const imageFileClick = () => {
    inputRef.current?.click();
  };

  const imageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    if (file.size > MAX_FILE_SIZE) {
      setError('파일 크기가 5MB를 초과했습니다.');
      return;
    }

    try {
      const response = await imageUpload(file);
      if (response?.url) {
        setImageUrl(response.url);
        onUploadImage(response.url);
      }
    } catch (error) {
      setError('이미지 업로드에 실패했습니다.');
    }
  };

  const removeImageFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageUrl(null);
    setError(null);
    onRemoveImage();
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="relative rounded-[8px] border border-black-300 bg-black-400 w-[140px] h-[140px] md:w-[135px] md:h-[135px] lg:w-[160px] lg:h-[160px]">
      <div
        className="flex justify-center items-center relative w-full h-full"
        onClick={imageFileClick}
      >
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={imageFileChange}
          className="hidden"
        />
        {imageUrl ? (
          <div className="relative w-full h-full">
            <Image
              src={imageUrl}
              alt="업로드한 이미지"
              fill
              className="rounded-[8px] object-cover"
            />
            <button
              onClick={removeImageFile}
              className="flex justify-center items-center absolute top-1 right-1 rounded-[8px] p-1 bg-black/50 w-[26px] h-[26px] lg:w-[28px] lg:h-[28px] z-50"
            >
              <Image src={deleteIcon} alt="이미지 제거" width={18} height={18} />
            </button>
          </div>
        ) : (
          <Image
            src={ImageIcon}
            alt="이미지 추가 아이콘"
            className="w-6 h-6 md:w-[25px] md:h-[25px] lg:w-[34px] lg:h-[34px]"
          />
        )}
      </div>
      {error && (
        <div className="absolute bottom-[-58px] left-0 w-full bg-red-500 text-white text-center py-1 rounded-b-[8px]">
          {error}
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
