import { useQuery } from '@tanstack/react-query';
import { getUserRanking } from '@/api/user';
import Link from 'next/link';
import ReviewerRankingSkeleton from '@/components/home/ReviewerRankingSkeleton';

const ReviewerRanking = () => {
  const {
    data: userRanking,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['userRanking'],
    queryFn: getUserRanking,
  });

  if (isLoading) return <ReviewerRankingSkeleton />;
  if (error) return <div>랭킹 조회 중 오류가 발생했습니다: {error.message}</div>;
  if (!userRanking) return <div>아직 등록된 리뷰어가 없습니다.</div>;

  function formatNumber(count: number): string {
    if (count >= 1000) {
      return (count / 1000).toFixed(count >= 10000 ? 0 : 1) + 'K';
    }
    return count.toString();
  }

  const Count = 1200;

  return (
    <ul className="w-full flex flex-row flex-nowrap gap-[15px] lg:flex-col lg:overflow-x-auto lg:gap-6">
      {userRanking?.map((user, index) => (
        <li key={user.id} className="flex-shrink-0">
          <Link
            href={`/user/${user.id}`}
            className="flex items-center flex-shrink-0 text-inherit hover:no-underline"
          >
            <div className="bg-white rounded-full w-9 h-9 mr-[10px]"></div>
            <div className="flex flex-col">
              <div className="flex items-center gap-[5px] mb-[5.5px] flex-shrink-0">
                <div
                  className={`text-[10px] py-[2px] px-[6px] rounded-[50px] flex-shrink-0 ${
                    index === 0
                      ? 'bg-[#FF2F9F1A] text-pink'
                      : index === 1
                        ? 'bg-[#05D58B1A] text-green'
                        : index === 2
                          ? 'bg-[#9FA6B21A] text-gray-100'
                          : 'bg-[#9FA6B21A] text-gray-100'
                  }`}
                >
                  {index + 1}등
                </div>
                <p className="text-[14px] font-medium block truncate max-w-[10ch] lg:text-[16px]">
                  {user.nickname}
                </p>
              </div>
              <div className="flex items-center gap-[10px] text-[10px] text-gray-200 font-light lg:text-[12px]">
                <p>팔로워 {formatNumber(user.followersCount)}</p>
                <p>리뷰 {formatNumber(user.reviewCount)}</p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ReviewerRanking;
