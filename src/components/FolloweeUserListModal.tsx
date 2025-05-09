import Modal from "@/components/Modal";

function showModal() {
   
}

const FolloweeUserList = () => {
    return (
        <div className="w-full flex flex-col gap-5 lg:gap-[25px]">
            <FolloweeUser />
            <FolloweeUser />
        </div>
    );
}

const FolloweeUser = () => {
  return (
    <div className="h-12 flex items-center gap-5 lg:h-13">
      <div className="w-12 h-12 border border-yellow rounded-full lg:w-[52px] lg:h-[52px]"></div>
      <span className="font-[16px] font-medium text-gray-50 lg:text-[18px]">갈릭짱짱맨</span>
    </div>
  );
};

function FolloweeUserListModal() {
  return (
    <div className="flex flex-col px-5 md:px-10">
      <span className="mt-10 mb-5 text-[20px] font-semibold text-gray-50 md:mt-15 md:mb-10 lg:text-[20px]">땡땡님을 팔로우하는 유저</span>
      <FolloweeUserList />
    </div>
  );
}

export default FolloweeUserListModal;
