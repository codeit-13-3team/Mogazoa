import { useEffect, useRef } from 'react';
import Image from 'next/image';
import ImageIcon from '../../public/icon/common/photo.png';
import deleteIcon from '../../public/icon/common/close.png';

type ImageUploaderProps = {
  isSingleImage?: boolean;
  image?: string;
  images?: string[];
  onUploadImage?: (url: string) => void;
  onUploadImages?: (urls: string[]) => void;
  onRemoveImage?: () => void;
  onRemoveImages?: (index: number) => void;
  maxImages?: number;
  errorMessage?: string;
};

function ImageUploader({
  isSingleImage = true,
  image = '',
  images = [],
  onUploadImage,
  onUploadImages,
  onRemoveImage,
  onRemoveImages,
  maxImages = 3,
  errorMessage,
}: ImageUploaderProps) {
  const addInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const validateFile = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) {
      alert('파일 크기가 5MB를 초과했습니다.');
      return null;
    }
    return URL.createObjectURL(file);
  };

  const singleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const url = validateFile(files[0]);
    if (!url) {
      e.target.value = '';
      return;
    }

    onUploadImage?.(url);
    e.target.value = '';
  };

  const addImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const url = validateFile(files[0]);
    if (!url) {
      e.target.value = '';
      return;
    }

    if (onUploadImages && images.length < maxImages) {
      onUploadImages([...images, url]);
    }
    e.target.value = '';
  };

  const replaceImagesChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const url = validateFile(files[0]);
    if (!url) {
      e.target.value = '';
      return;
    }

    if (onUploadImages) {
      const newImages = [...images];
      newImages[index] = url;
      onUploadImages(newImages);
    }
    e.target.value = '';
  };

  const imageFileClick = () => {
    addInputRef.current?.click();
  };

  const replaceFileClick = (index: number) => {
    replaceInputRefs.current[index]?.click();
  };

  const removeImageFile = (index?: number) => {
    if (isSingleImage) {
      onRemoveImage?.();
    } else if (typeof index === 'number') {
      onRemoveImages?.(index);
    }
  };

  useEffect(() => {
    if (errorMessage) {
      alert(errorMessage);
    }
  }, [errorMessage]);

  if (isSingleImage) {
    return (
      <div className="relative rounded-[8px] border border-black-300 bg-black-400 w-[140px] h-[140px] md:w-[135px] md:h-[135px] lg:w-[160px] lg:h-[160px]">
        <div
          className="flex justify-center items-center relative w-full h-full cursor-pointer"
          onClick={() => addInputRef.current?.click()}
        >
          <input
            type="file"
            accept="image/*"
            ref={addInputRef}
            onChange={singleImageChange}
            className="hidden"
          />
          {image ? (
            <div className="relative w-full h-full">
              <Image
                src={image}
                alt="업로드한 이미지"
                fill
                className="rounded-[8px] object-cover"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeImageFile();
                }}
                className="flex justify-center items-center absolute top-1 right-1 rounded-[8px] p-1 bg-[#000000]/50 w-[26px] h-[26px] lg:w-[28px] lg:h-[28px] z-50"
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
      </div>
    );
  }

  return (
    <div className="flex flex-nowrap overflow-x-auto gap-[10px] md:gap-[15px] lg:gap-5">
      {images.length < maxImages && (
        <div
          className="flex justify-center items-center relative rounded-[8px] border border-black-300 bg-black-400 w-[140px] h-[140px] md:w-[135px] md:h-[135px] lg:w-[160px] lg:h-[160px] shrink-0 cursor-pointer"
          onClick={imageFileClick}
        >
          <input
            type="file"
            accept="image/*"
            ref={addInputRef}
            onChange={addImagesChange}
            className="hidden"
          />
          <Image
            src={ImageIcon}
            alt="이미지 추가 아이콘"
            className="w-6 h-6 md:w-[25px] md:h-[25px] lg:w-[34px] lg:h-[34px]"
          />
        </div>
      )}

      {images.map((imgUrl, index) => (
        <div
          key={index}
          className="relative rounded-[8px] border border-black-300 bg-black-400 w-[140px] h-[140px] md:w-[135px] md:h-[135px] lg:w-[160px] lg:h-[160px] shrink-0"
        >
          <Image
            src={imgUrl}
            alt={`업로드한 이미지 ${index + 1}`}
            fill
            className="rounded-[8px] object-cover cursor-pointer"
            onClick={() => replaceFileClick(index)}
          />
          <input
            type="file"
            accept="image/*"
            ref={(el) => {
              replaceInputRefs.current[index] = el;
            }}
            onChange={replaceImagesChange(index)}
            className="hidden"
          />
          <button
            className="flex justify-center items-center absolute top-1 right-1 rounded-[8px] p-1 bg-[#000000]/50 w-[26px] h-[26px] lg:w-[28px] lg:h-[28px] z-50"
            onClick={() => removeImageFile(index)}
          >
            <Image src={deleteIcon} alt="이미지 제거" width={18} height={18} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default ImageUploader;
