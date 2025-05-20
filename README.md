**MOGAZOA**는 다양한 분야의 상품을 A/B 테스트 방식으로 비교하고, 사용자 리뷰 및 별점을 통해 데이터를 시각화하는 웹 기반 비교 플랫폼입니다.  



## ✨ 주요 기능 (Features)

-  **회원가입 및 로그인**  
  일반 로그인 / 소셜 로그인(카카오) / 간편 회원가입 기능 제공

-  **상품 비교 기능 (A/B 테스트 방식)**  
  두 상품 중 하나를 선택하는 비교 시스템  
  비교 결과에 따라 승패가 시각적으로 구분되는 애니메이션 효과

-  **상품 상세 페이지 및 추가**  
  무한 스크롤 기반 상품 목록  
  상품 별 상세 페이지 + 상품 추가/편집/삭제 기능

-  **리뷰 및 별점 작성**  
  리뷰 모달을 통한 사용자 의견 수집  
  별점 기반 랭킹 시스템 포함

-  **검색 & 정렬 기능**  
  키워드 기반 검색 기능 구현  
  상품명 기준 정렬 필터

-  **마이페이지 & 유저 팔로우**  
  내 프로필 관리 및 다른 유저 팔로우/팔로잉 모달 기능



## 🛠️ 기술 스택 (Tech Stack)

| 영역         | 툴 |
|--------------|-----------|
| **Frontend** | Next.js 13 / TypeScript / React Query / Zustand / Tailwind |
| **Auth**     | localStorage / Kakao OAuth |
| **Deploy**   | Vercel |
| **Design**   | Figma / Notion|
| **기타**     | ESLint / Prettier / GitHub Actions |


## 📁 폴더 구조

/src
├── api/         
├── assets/       
├── components/   
├── context/    
├── hooks/          
├── lib/         
├── pages/        
├── stores/        
├── styles/      
├── types/         

기타 루트 파일
├── .eslintrc.js / .prettierrc      
├── next.config.ts / tsconfig.json  
├── tailwind.config.js             
├── build.sh                  

## 팀원 소개

정태인: 	프로젝트 초기 세팅, 홈, 배포 등
신주하:	공통 헤더/검색창, UI 흐름 설계 등
정종우:	회원가입, API 연동, 소셜 로그인 등
임지혜:	공통 모달창, 이미지 업로더, 리뷰 시스템 등
황준호:	공통 드롭다운, 유저 관련 모달 등
이재혁:	상품 상세 페이지, 버튼 컴포넌트 등 UI 구현 등

