import { GetMeResponse } from '@/types/user';
import Image from 'next/image';

function Profile(profileData: GetMeResponse, isMyProfile: boolean) {
  return (
    <div className="mb-[60px] px-[20px] py-[30px] w-full h-auto md:px-[30px] lg:w-[340px] rounded-[8px] bg-[#252530]">
      <div className="w-full h-full flex flex-col justify-between items-center gap-[30px] lg:gap-[40px]">
        <div className="w-[120px] h-[120px] relative rounded-full lg:w-[180px] lg:h-[180px]">
          {profileData?.image ? (
            <Image src={profileData.image} alt="유저 이미지" fill />
          ) : (
            <Image src="/img/profileimage/img=profile1.png" alt="유저 이미지" fill />
          )}
        </div>
        <div className="w-full flex flex-col gap-[10px] lg:gap-[20px]">
          <span className="text-center text-[20px] font-semibold text-[#F1F1F5] lg:text-[24px]">
            {profileData?.nickname}
          </span>
          <p className="text-[14px] font-normal text-[#6E6E82] lg:text-[16px]">
            {profileData?.description}
          </p>
        </div>
        <div className="w-full px-[51px] flex justify-between relative md:px-[108px] lg:px-[58px]">
          <div className="flex flex-col items-center gap-[10px]">
            <span className="text-[18px] font-semibold text-[#F1F1F5] lg:text-[20px]">
              {profileData?.followersCount}
            </span>
            <span className="text-[14px] font-normal text-[#9FA6B2] lg:text-[16px]">팔로워</span>
          </div>
          <div className="absolute left-1/2 top-0 w-px h-full bg-[#353542]"></div>
          <div className="flex flex-col items-center gap-[10px]">
            <span className="text-[18px] font-semibold text-[#F1F1F5] lg:text-[20px]">
              {profileData?.followeesCount}
            </span>
            <span className="text-[14px] font-normal text-[#9FA6B2] lg:text-[16px]">팔로잉</span>
          </div>
        </div>
        <div className="w-full h-[50px] text-center border border-[black]">버튼</div>
      </div>
    </div>
  );
}

export default Profile;