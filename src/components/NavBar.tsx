import Image from 'next/image';
import Link from 'next/link';

import LogoL from '@/assets/logo/logoL.png';
import LogoS from '@/assets/logo/logoS.png';
import MenuIcon from '@/assets/logo/menu.png';
import SearchIcon from '@/assets/logo/search.png';

interface NavBarProps {
  showSearch?: boolean;
  isLoggedIn?: boolean;
}

const NavBar = ({ showSearch = true, isLoggedIn = false }: NavBarProps) => {
  return (
    <header
      className="w-full bg-black-500 flex items-center justify-between
                 h-[70px] md:h-[80px] lg:h-[95px]
                 px-4 md:px-6 lg:px-[80px] relative"
    >
      {/* 모바일 */}
      <div className="flex justify-between items-center w-full md:hidden">
        <Image
          src={MenuIcon}
          alt="메뉴"
          width={24}
          height={24}
          className="w-6 h-6"
        />
        <Link href="/">
          <Image
            src={LogoS}
            alt="로고"
            width={112}
            height={18}
            className="w-[112px] h-[18px]"
          />
        </Link>
        <Image
          src={SearchIcon}
          alt="검색"
          width={24}
          height={24}
          className="w-6 h-6"
        />
      </div>

      {/* 태블릿 & PC */}
      <div className="hidden md:flex items-center justify-between w-full">
        <Link href="/">
          <Image
            src={LogoL}
            alt="로고"
            width={166}
            height={28}
            className="md:w-[138px] md:h-[24px] lg:w-[166px] lg:h-[28px]"
          />
        </Link>

        <div className="flex items-center">
          {showSearch && (
            <div
              className="flex items-center px-4 py-2 rounded-full text-sm
                         h-[50px] md:h-[46px] lg:h-[56px]
                         w-[220px] md:w-[300px] lg:w-[400px]
                         mr-[20px] md:mr-[30px] bg-black-400 text-gray-200"
            >
              <Image
                src={SearchIcon}
                alt="검색"
                width={20}
                height={20}
                className="w-5 h-5 opacity-70"
              />
              <span className="ml-2 text-gray-200 text-sm whitespace-nowrap">
                상품 이름을 검색해 보세요.
              </span>
            </div>
          )}

          {isLoggedIn ? (
            <div className="flex gap-[32px] pr-[100px] text-sm text-white">
              <button className="hover:underline">비교하기</button>
              <Link href="/mypage" className="hover:underline">
                내 프로필
              </Link>
            </div>
          ) : (
            <div className="flex gap-3 md:gap-4 text-sm text-white">
              <Link href="/login" className="hover:underline">
                로그인
              </Link>
              <Link href="/signup" className="hover:underline">
                회원가입
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-black-400" />
    </header>
  );
};

export default NavBar;
