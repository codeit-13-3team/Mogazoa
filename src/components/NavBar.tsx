import Image from 'next/image';
import Link from 'next/link';

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
      {/* 모바일 전용 */}
      <div className="flex justify-between items-center w-full md:hidden">
        <Image
          src="/icon/common/menu.png"
          alt="메뉴"
          width={24}
          height={24}
          sizes="24px"
          className="w-6 h-6"
        />
        <Link href="/">
        <Image
          src="/icon/logo/logoS.png"
          alt="로고"
          width={112}
          height={18}
          sizes="112px"
          className="w-[112px] h-[18px]"
        />
        </Link>
        <Image
          src="/icon/common/search.png"
          alt="검색"
          width={24}
          height={24}
          sizes="24px"
          className="w-6 h-6"
        />
      </div>

      {/* 태블릿 & PC */}
      <div className="hidden md:flex items-center justify-between w-full">
        
      <Link href="/">
         <Image
          src="/icon/logo/logoL.png"
          alt="로고"
          width={166}
          height={28}
          sizes="(min-width: 1024px) 166px, 138px"
          className="md:w-[138px] md:h-[24px] lg:w-[166px] lg:h-[28px]"
        />
        </Link>

        {/*  검색창+ 버튼 */}
        <div className="flex items-center">
          {showSearch && (
            <div
              className="flex items-center px-4 py-2 rounded-full text-sm
                         h-[50px] md:h-[46px] lg:h-[56px]
                         w-[220px] md:w-[300px] lg:w-[400px]
                         mr-[20px] md:mr-[30px] bg-black-400 text-gray-200"
            >
              <Image
                src="/icon/common/search.png"
                alt="검색"
                width={20}
                height={20}
                sizes="20px"
                className="w-5 h-5 opacity-70"
              />
              <span className="ml-2 text-gray-200 text-sm whitespace-nowrap">
                상품 이름을 검색해 보세요.
              </span>
            </div>
          )}

          {/* 조건부 버튼: 비로그인시 로그인/회원가입, 로그인시 비교하기/ 내프로필  ;*/}
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

      {/* 구분선 */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-black-400" />
    </header>
  );
};

export default NavBar;
