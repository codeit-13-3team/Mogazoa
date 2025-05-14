import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useAuthStore from '@/stores/authStores';

import LogoL from '@/assets/logo/logoL.png';
import LogoS from '@/assets/logo/logoS.png';
import MenuIcon from '@/assets/logo/menu.png';
import SearchIcon from '@/assets/logo/search.png';
import LogoutIcon from '@/assets/logo/logout.png';

interface NavBarProps {
  showSearch?: boolean;
}

const NavBar = ({ showSearch = true }: NavBarProps) => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    router.push('/');
    router.reload();
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/');
    router.reload();
  };

  const handleSearch = () => {
    if (searchInput.trim().length >= 1) {
      router.push(`/?keyword=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="w-full bg-black-500 flex items-center justify-between h-[70px] md:h-[80px] lg:h-[95px] px-4 md:px-6 lg:px-[80px] relative">
      {/* 모바일 */}
      <div className="flex justify-between items-center w-full md:hidden">
        <Image src={MenuIcon} alt="메뉴" width={24} height={24} className="w-6 h-6" />
        <a href="/" onClick={handleLogoClick}>
          <Image src={LogoS} alt="로고" width={112} height={18} className="w-[112px] h-[18px]" />
        </a>
        <Image src={SearchIcon} alt="검색" width={24} height={24} className="w-6 h-6" />
      </div>

      {/* 태블릿 & PC */}
      <div className="hidden md:flex items-center justify-end w-full">
        <a href="/" onClick={handleLogoClick} className="mr-auto">
          <Image
            src={LogoL}
            alt="로고"
            width={166}
            height={28}
            className="md:w-[138px] md:h-[24px] lg:w-[166px] lg:h-[28px]"
          />
        </a>
        {showSearch && (
          <div className="flex items-center px-4 py-2 rounded-full text-sm
                          h-[50px] md:h-[46px] lg:h-[56px]
                          w-[220px] md:w-[300px] lg:w-[400px]
                          mr-[20px] bg-black-400 text-gray-200">
            <Image
              src={SearchIcon}
              alt="검색"
              width={20}
              height={20}
              onClick={handleSearch}
              className="w-5 h-5 opacity-70 cursor-pointer"
            />
            <input
              type="text"
              placeholder="상품 이름을 검색하세요."
              className="ml-2 bg-transparent outline-none text-sm text-gray-200 w-full"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        )}
        <div className="flex items-center gap-8 text-sm text-white">
          {isLoggedIn ? (
            <>
              <Link href="/compare" className="no-underline hover:no-underline text-white">
                비교하기
              </Link>
              <Link href="/mypage" className="no-underline hover:no-underline text-white">
                내 프로필
              </Link>
              <button onClick={handleLogout} className="no-underline hover:no-underline text-white">
                <Image src={LogoutIcon} alt="로그아웃" width={24} height={24} className="w-6 h-6" />
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="no-underline hover:no-underline text-white">
                로그인
              </Link>
              <Link href="/signup" className="no-underline hover:no-underline text-white">
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-black-400" />
    </header>
  );
};

export default NavBar;
