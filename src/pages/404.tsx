import { NextPage } from 'next';
import React from 'react';
import Image from 'next/image';

const Error404: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-5 text-gray-50 text-center bg-black-400 font-sans">
      
      {/* 404 텍스트 & 아이콘 */}
      <div className="flex items-center gap-[12px] mb-[12px]">
        <Image
          src="/icon/logo/reversedMouse.svg"
          alt="404 Logo"
          width={40}
          height={40}
          className="drop-shadow-md md:w-[80px] md:h-[80px] w-[48px] h-[48px]"
        />
        <h1 className="text-[40px] md:text-[80px] font-bold leading-none">404</h1>
      </div>

      {/* 영어 문구 - 데스크탑 */}
      <p className="hidden md:block text-[25px] mb-[12px] drop-shadow-md leading-normal">
        Sorry, the page you are looking for could not be found.
      </p>

      {/* 영어 문구 - 모바일 */}
      <p className="block md:hidden text-[20px] mb-[8px] drop-shadow-md leading-normal">
        Sorry, the page could not be found.
      </p>

      {/* 한글 문구 */}
      <p className="text-[18px] md:text-[23px] mb-[10px] drop-shadow-md leading-snug">
        죄송합니다. 페이지를 찾을 수 없습니다.
      </p>

      {/* 홈 버튼 */}
      <a
      href="/"
      role="button"
      className="mt-[10px] px-6 py-3 text-[16px] font-semibold bg-white rounded-full shadow-md border
       transition-all hover:scale-[1.05] drop-shadow-sm !text-black !no-underline hover:!text-black "
      >
     홈으로 가기
      </a>


    </div>
  );
};

export default Error404;
