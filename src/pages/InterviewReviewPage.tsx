import React, { useEffect, useState } from 'react';
import InterviewReview from '../components/InterviewReview';
import ReviewModal from '../components/ReviewModal';
import { IoIosArrowForward } from 'react-icons/io';
import axios from 'axios';

interface Review {
  id: number;
  company: string;
  interviewerCount: number;
  review: string;
  difficulty: number;
  mood: number;
  createdAt: string;
  updatedAt: string;
}

const InterviewReviewPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get<Review[]>('http://localhost:8080/api/reviews');
        setReviews(response.data);
        setLoading(false);
      } catch (err) {
        setError('면접 후기를 불러오는데 실패했습니다.');
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleSubmitReview = async (reviewData: {
    company: string;
    interviewerCount: number;
    review: string;
    difficulty: number;
    mood: number;
  }) => {
    try {
      await axios.post('http://localhost:8080/api/reviews', reviewData);
      setIsModalOpen(false);
      // Refresh reviews after successful submission
      const response = await axios.get<Review[]>('http://localhost:8080/api/reviews');
      setReviews(response.data);
    } catch (err) {
      setError('면접 후기 등록에 실패했습니다.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-8 flex items-center justify-center">
        <div className="text-curpick-brown">로딩중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white p-8 flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-[1200px] mx-auto space-y-8">
        <div className="flex justify-end">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-curpick-brown text-white px-3 py-2 text-lg flex items-center gap-2"
          >
            지금 면접 후기 공유하기 <IoIosArrowForward className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-8">
          {reviews.map((review) => (
            <InterviewReview key={review.id} {...review} />
          ))}
        </div>

        <ReviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitReview}
        />
      </div>
    </div>
  );
};

export default InterviewReviewPage; 