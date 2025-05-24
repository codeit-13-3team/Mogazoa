'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ReviewListItem } from '@/types/product';

export interface ProductReviewsProps {
  id: number;
  order?: 'recent' | 'ratingDesc' | 'ratingAsc' | 'likeCount';
}

const likeReview = async (reviewId: number): Promise<void> => {
  const res = await fetch(`https://mogazoa-api.vercel.app/13-3/reviews/${reviewId}/like`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error('Failed to like review');
};

const unlikeReview = async (reviewId: number): Promise<void> => {
  const res = await fetch(`https://mogazoa-api.vercel.app/13-3/reviews/${reviewId}/like`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to unlike review');
};

export default function ProductReviews({ id, order = 'recent' }: ProductReviewsProps) {
  const queryClient = useQueryClient();

  const { data: reviews, isLoading } = useQuery<ReviewListItem[]>({
    queryKey: ['reviews', id, order],
    queryFn: async () => {
      const res = await fetch(
        `https://mogazoa-api.vercel.app/13-3/products/${id}/reviews?order=${order}`,
      );
      const data = await res.json();
      return data.list;
    },
    enabled: Boolean(id),
  });

  const likeReviewMutation = useMutation<void, Error, number>({
    mutationFn: likeReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', id, order] });
    },
  });

  const unlikeReviewMutation = useMutation<void, Error, number>({
    mutationFn: unlikeReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', id, order] });
    },
  });

  const handleLikeClick = (reviewId: number, isLiked: boolean) => {
    if (isLiked) {
      unlikeReviewMutation.mutate(reviewId);
    } else {
      likeReviewMutation.mutate(reviewId);
    }
  };

  if (isLoading) {
    return (
      <section className="w-[940px] mx-auto min-h-[120px] flex items-center justify-center text-gray-400">
        로딩 중...
      </section>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <section className="w-[940px] mx-auto">
        <div className="bg-black-400 rounded-xl p-8">
          <div className="text-gray-400 text-center py-8">리뷰가 없습니다</div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-[940px] mx-auto">
      <div className="bg-black-400 rounded-xl p-8">
        <div className="space-y-6">
          {reviews.map((review) => (
            <article key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={review.user.image || '/placeholder-user.png'}
                    alt={review.user.nickname}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">{review.user.nickname}</div>
                  <div className="text-sm text-gray-500">{review.createdAt}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-main-indigo">⭐️ {review.rating}</span>
              </div>
              <div className="text-gray-300 mb-4">{review.content}</div>
              {review.reviewImages.length > 0 && (
                <div className="flex gap-2">
                  {review.reviewImages.map((image) => (
                    <div key={image.id} className="w-20 h-20 rounded-lg overflow-hidden">
                      <img
                        src={image.source}
                        alt="리뷰 이미지"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
              <button
                className={`flex items-center gap-1 text-sm ${review.isLiked ? 'text-red-500' : 'text-gray-400'} hover:text-red-500`}
                onClick={() => handleLikeClick(review.id, review.isLiked)}
                disabled={likeReviewMutation.isPending || unlikeReviewMutation.isPending}
              >
                <span>❤️</span> {review.likeCount}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
