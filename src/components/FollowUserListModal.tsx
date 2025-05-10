import Modal from '@/components/Modal';
import { FollowUserItem } from '@/types/user';

import Image from 'next/image';

interface FollowUserListModalProp {
  userName: string;
  followUserListData: FollowUserItem[];
  onClose: () => void;
}

interface FollowUserProp {
  nickname?: string;
  image?: string;
}

interface FollowUserListProp {
  followUserListData: FollowUserItem[];
}

const FollowUserList = ({ followUserListData }: FollowUserListProp) => {
  console.log(followUserListData);
  return (
    <div className="w-full flex flex-col gap-5 lg:gap-[25px]">
      {followUserListData ? (
        followUserListData.map((followUser) => (
          <FollowUser nickname={followUser.follower.nickname} image={followUser.follower.image} />
        ))
      ) : (
        <div>팔로우 유저가 없습니다.</div>
      )}
    </div>
  );
};

const FollowUser = ({ nickname, image }: FollowUserProp) => {
  return (
    <div className="h-12 flex items-center gap-5 lg:h-13">
      <div className="w-12 h-12 relative border rounded-full lg:w-[52px] lg:h-[52px]">
        {image ? (
          <Image
            src={image}
            alt="유저프로필"
            fill
            sizes="(max-width: 1023px) 48px, (min-width: 1024px) 52px"
          />
        ) : (
          <Image
            src="/img/profileimage/profile1.png"
            alt="유저프로필"
            fill
            sizes="(max-width: 1023px) 48px, (min-width: 1024px) 52px"
          />
        )}
      </div>
      <span className="font-[16px] font-medium text-gray-50 lg:text-[18px]">{nickname}</span>
    </div>
  );
};

function FollowUserListModal({ userName, followUserListData, onClose }: FollowUserListModalProp) {
  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col ">
        <span className="mb-5 text-[20px] font-semibold text-gray-50 md:mb-10 lg:text-[20px]">
          {userName}님을 팔로우하는 유저
        </span>
        <FollowUserList followUserListData={followUserListData} />
      </div>
    </Modal>
  );
}

export default FollowUserListModal;
