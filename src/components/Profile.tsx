import { GetMeResponse } from '@/types/user';
import Image from 'next/image';
import noImage from '../../public/img/profileimage/profile1.png';
import { followUser, unfollowUser } from '@/api/follow';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import EditProfileModal from '@/components/EditProfileModal';
import { useState } from 'react';

interface ProfileProp {
  profileData: GetMeResponse;
  isMyProfile?: boolean;
  editProfile?: () => void;
  logout?: () => void;
  onClickFollowBtn?: () => void;
}

function Profile({
  profileData,
  isMyProfile = false,
  logout,
}: ProfileProp) {
  const [modalClose, setModalClose] = useState<boolean>(true);

  const queryClient = useQueryClient();

  const followMutation = useMutation({
    mutationFn: followUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: unfollowUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <div className="mb-[60px] px-[20px] py-[30px] w-full h-auto rounded-lg bg-black-400 md:px-[30px] lg:w-[340px] lg:mb-0">
      <div className="w-full h-auto flex flex-col items-center gap-[30px] lg:gap-10">
        <div className="w-[120px] h-[120px] relative rounded-full overflow-hidden lg:w-[180px] lg:h-[180px]">
          {profileData?.image ? (
            <Image src={profileData.image} alt="유저 이미지" fill />
          ) : (
            <Image src={noImage} alt="유저 이미지" fill />
          )}
        </div>
        <div className="w-full flex flex-col gap-[10px] lg:gap-5">
          <span className="text-center text-[20px] font-semibold text-gray-50 lg:text-[24px]">
            {profileData?.nickname}
          </span>
          <p className="text-[14px] font-normal text-gray-200 lg:text-[16px]">
            {profileData?.description}
          </p>
        </div>
        <div className="w-full px-[51px] flex justify-between relative md:px-[108px] lg:px-[58px]">
          <div className="flex flex-col items-center gap-[10px]">
            <span className="text-[18px] font-semibold text-gray-50 lg:text-[20px]">
              {profileData?.followersCount}
            </span>
            <span className="text-[14px] font-normal text-gray-100 lg:text-[16px]">팔로워</span>
          </div>
          <div className="absolute left-1/2 top-0 w-px h-full bg-black-300"></div>
          <div className="flex flex-col items-center gap-[10px]">
            <span className="text-[18px] font-semibold text-gray-50 lg:text-[20px]">
              {profileData?.followeesCount}
            </span>
            <span className="text-[14px] font-normal text-gray-100 lg:text-[16px]">팔로잉</span>
          </div>
        </div>
        {isMyProfile ? (
          <div className="w-full flex flex-col gap-[10px] md:gap-[15px] lg:gap-5">
            <div
              className="w-full h-[50px] flex justify-center items-center rounded-lg bg-main-blue text-gray-50 text-[16px] font-semibold hover:cursor-pointer
            md:h-[55px] lg:h-[65px] lg:text-[18px]"
              onClick={() => setModalClose(false)}
            >
              프로필 편집
            </div>
            <div
              className="w-full h-[50px] flex justify-center items-center rounded-lg border border-gray-100 text-gray-100 text-[16px] font-semibold hover:cursor-pointer
            md:h-[55px] lg:h-[65px] lg:text-[18px]"
              onClick={logout}
            >
              로그아웃
            </div>
          </div>
        ) : profileData.isFollowing ? (
          <div
            className="w-full h-[50px] flex justify-center items-center rounded-lg border border-gray-100 text-gray-100 text-[16px] font-semibold hover:cursor-pointer
            md:h-[55px] lg:h-[65px] lg:text-[18px]"
            onClick={() => unfollowMutation.mutate(profileData.id)}
          >
            팔로우 취소
          </div>
        ) : (
          <div
            className="w-full h-[50px] flex justify-center items-center rounded-lg bg-main-blue text-gray-50 text-[16px] font-semibold hover:cursor-pointer
            md:h-[55px] lg:h-[65px] lg:text-[18px]"
            onClick={() => followMutation.mutate(profileData.id)}
          >
            팔로우
          </div>
        )}
      </div>
      { modalClose ? null : <EditProfileModal profileData={profileData} onClose={() => setModalClose(true)} />}
    </div>
  );
}

export default Profile;
