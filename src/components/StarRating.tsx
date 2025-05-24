import Image from 'next/image';
import { CiStar as EmptyStar } from 'react-icons/ci';
import { PiStarHalfFill as HalfStar } from 'react-icons/pi';
import FullStar from '../../public/icon/common/star.png';

type StarRatingProps = {
  value: number;
  onChange?: (value: number) => void;
  starClassName?: string;
};

function StarRating({ value, onChange, starClassName }: StarRatingProps) {
  const handleClick = (e: React.MouseEvent<HTMLSpanElement>, index: number) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const isHalf = x < width / 2;
    const newValue = isHalf ? index + 0.5 : index + 1;
    onChange?.(newValue);
  };

  const renderStar = (index: number) => {
    const commonClasses = starClassName ?? 'md:w-8 md:h-8';

    const diff = value - index;
    if (diff >= 1) {
      return (
        <Image src={FullStar} alt="별점 아이콘" width={28} height={28} className={commonClasses} />
      );
    }
    if (diff >= 0.5) {
      return <HalfStar size={28} className={`${commonClasses} text-yellow`} />;
    }
    return <EmptyStar size={28} className={`${commonClasses} text-gray-200`} />;
  };

  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="relative" onClick={(e) => handleClick(e, i)}>
          {renderStar(i)}
        </span>
      ))}
    </div>
  );
}

export default StarRating;
