import { NextPage } from 'next';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import reversedMouse from '@/assets/logo/reversedMouse.svg';

const Error404: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-5 text-gray-50 text-center bg-black-400 font-sans">
       
      <div className="flex items-center gap-3 mb-3">
        <Image
          src={reversedMouse}
          alt="404 Logo"
          width={80}
          height={80}
          sizes="(min-width: 768px) 80px, 48px"
          className="drop-shadow-md w-12 h-12 md:w-20 md:h-20"
        />
        <h1 className="text-4xl md:text-8xl font-bold leading-none">404</h1>
      </div>
 
      <p className="hidden md:block text-xl mb-4 drop-shadow-md leading-normal">
        Sorry, the page you are looking for could not be found.
      </p>
 
      <p className="block md:hidden text-lg mb-2 drop-shadow-md leading-normal">
        Sorry, the page could not be found.
      </p> 

      <p className="text-base md:text-xl mb-3 drop-shadow-md leading-snug">
        죄송합니다. 페이지를 찾을 수 없습니다.
      </p>
 
      <Link
        href="/"
        className="mt-2.5 px-6 py-3 text-base font-semibold bg-white rounded-full shadow-md border 
                   transition-all hover:scale-105 drop-shadow-sm text-black no-underline hover:text-black"
      >
        홈으로 가기
      </Link>
    </div>
  );
};

export default Error404;
