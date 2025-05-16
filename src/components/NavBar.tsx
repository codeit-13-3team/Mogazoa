import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
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
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsLoggedIn(true);
  }, [setIsLoggedIn]);

  useEffect(() => {
    const handleRouteChange = () => setSearchInput('');
    router.events.on('routeChangeStart', handleRouteChange);
    return () => router.events.off('routeChangeStart', handleRouteChange);
  }, [router]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowMobileMenu(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowMobileSearch(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/').then(() => {
      router.reload();
    });
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/').then(() => {
      router.reload();
    });
  };

  const handleSearch = () => {
    if (searchInput.trim().length >= 1) {
      router.push(`/?keyword=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleMenuClick = (path: string) => {
    setShowMobileMenu(false);
    router.push(path);
  };

  return (
    <header className="w-full bg-black-500 flex items-center justify-between h-[70px] md:h-[80px] lg:h-[95px] px-4 md:px-6 lg:px-[80px] relative">
      {/* 모바일 */}
      <div className="flex justify-between items-center w-full md:hidden relative">
        <button onClick={() => setShowMobileMenu((prev) => !prev)}>
          <Image src={MenuIcon} alt="메뉴" width={24} height={24} className="w-6 h-6" />
        </button>

        <Link href="/" onClick={handleLogoClick} className="cursor-pointer">
          <Image src={LogoS} alt="로고" width={112} height={18} className="w-[112px] h-[18px]" />
        </Link>

        <button onClick={() => setShowMobileSearch((prev) => !prev)}>
          <Image src={SearchIcon} alt="검색" width={24} height={24} className="w-6 h-6" />
        </button>

        {showMobileMenu && (
          <div
            ref={dropdownRef}
            className="overflow-hidden transition-all duration-300 ease-in-out bg-black-400 border border-black-300 text-gray-300 rounded-md shadow-md w-44 absolute top-[30px] z-50 py-2"
          >
            {isLoggedIn ? (
              <>
                <button onClick={() => handleMenuClick('/compare')} className="block w-full text-left px-4 py-2 hover:bg-black-300 hover:text-white">
                  비교하기
                </button>
                <button onClick={() => handleMenuClick('/mypage')} className="block w-full text-left px-4 py-2 hover:bg-black-300 hover:text-white">
                  내 프로필
                </button>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-black-300 hover:text-white">
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <button onClick={() => handleMenuClick('/login')} className="block w-full text-left px-4 py-2 hover:bg-black-300 hover:text-white">
                  로그인
                </button>
                <button onClick={() => handleMenuClick('/signup')} className="block w-full text-left px-4 py-2 hover:bg-black-300 hover:text-white">
                  회원가입
                </button>
              </>
            )}
          </div>
        )}

        {showMobileSearch && (
          <div
            ref={searchRef}
            className="absolute left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm h-[49px] bg-black-400 text-white flex items-center px-4 rounded-full shadow-md transition-all"
          >
            <input
              type="text"
              placeholder="상품 이름을 검색하세요."
              className="ml-2 bg-transparent outline-none text-sm text-white w-full placeholder-gray-400 focus:placeholder-transparent"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        )}
      </div>

      {/* 태블릿 & PC */}
      <div className="hidden md:flex items-center justify-end w-full">
        <Link href="/" onClick={handleLogoClick} className="mr-auto">
          <Image
            src={LogoL}
            alt="로고"
            width={166}
            height={28}
            className="md:w-[138px] md:h-[24px] lg:w-[166px] lg:h-[28px]"
          />
        </Link>

        {showSearch && (
          <div className="flex items-center px-4 py-2 rounded-full text-sm h-[50px] md:h-[46px] lg:h-[56px] w-[220px] md:w-[300px] lg:w-[400px] mr-[20px] bg-black-400 text-gray-200">
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
              className="ml-2 bg-transparent outline-none text-sm text-gray-200 w-full placeholder-gray-400 focus:placeholder-transparent"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        )}

        <div className="flex items-center gap-8 text-sm text-white">
          {isLoggedIn ? (
            <>
              <Link href="/compare" className="text-white">비교하기</Link>
              <Link href="/mypage" className="text-white">내 프로필</Link>
              <button onClick={handleLogout} className="text-white">
                <Image src={LogoutIcon} alt="로그아웃" width={24} height={24} className="w-6 h-6" />
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-white">로그인</Link>
              <Link href="/signup" className="text-white">회원가입</Link>
            </>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-black-400" />
    </header>
  );
};

export default NavBar;
