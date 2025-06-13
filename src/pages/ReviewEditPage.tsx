import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoIosArrowBack } from 'react-icons/io';
import CurpickCheck from '../assets/CurpickCheck.svg';
import { useUser } from '../contexts/UserContext';

interface Review {
  id: number;
  company: string;
  interviewerCount: number;
  review: string;
  difficulty: number;
  mood: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

const ReviewEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [review, setReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isLoggedIn, userId } = useUser();

  // 폼 상태
  const [company, setCompany] = useState('');
  const [interviewerCount, setInterviewerCount] = useState(1);
  const [reviewText, setReviewText] = useState('');
  const [difficulty, setDifficulty] = useState(1);
  const [mood, setMood] = useState(1);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get<Review>(`http://localhost:8080/api/reviews/${id}`);
        const reviewData = response.data;
        
        // 현재 사용자가 작성자인지 확인
        if (!isLoggedIn || reviewData.userId !== userId) {
          navigate('/reviews');
          return;
        }

        setReview(reviewData);
        setCompany(reviewData.company);
        setInterviewerCount(reviewData.interviewerCount);
        setReviewText(reviewData.review);
        setDifficulty(reviewData.difficulty);
        setMood(reviewData.mood);
        setLoading(false);
      } catch (err) {
        setError('면접 후기를 불러오는데 실패했습니다.');
        setLoading(false);
      }
    };

    fetchReview();
  }, [id, isLoggedIn, userId, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/api/reviews/${id}`, {
        company,
        interviewerCount,
        review: reviewText,
        difficulty,
        mood
      });
      navigate(`/reviews/${id}`);
    } catch (err) {
      setError('게시글 수정에 실패했습니다.');
    }
  };

  const renderChecks = (count: number, maxCount: number = 5, type: 'difficulty' | 'mood') => {
    return Array.from({ length: maxCount }).map((_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => type === 'difficulty' ? setDifficulty(index + 1) : setMood(index + 1)}
      >
        <img
          src={CurpickCheck}
          alt="check"
          className={`w-6 h-6 ${index < count ? 'opacity-100' : 'opacity-30'}`}
        />
      </button>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F9FA] pt-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">로딩 중...</div>
        </div>
      </div>
    );
  }

  if (error || !review) {
    return (
      <div className="min-h-screen bg-[#F9F9FA] pt-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9FA] pt-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-black hover:text-gray-700 mb-8"
        >
          <IoIosArrowBack size={24} />
          <span>목록으로</span>
        </button>

        <form onSubmit={handleSubmit} className="bg-white rounded-[20px] p-8 shadow-md">
          {/* 회사명 */}
          <div className="mb-6">
            <label className="block text-lg font-semibold text-black mb-2">회사명</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full h-11 px-4 border-2 border-[#7C4D25] rounded-[10px] focus:outline-none"
              required
            />
          </div>

          {/* 면접인원 */}
          <div className="mb-6">
            <label className="block text-lg font-semibold text-black mb-2">면접인원</label>
            <input
              type="number"
              value={interviewerCount}
              onChange={(e) => setInterviewerCount(Number(e.target.value))}
              min="1"
              className="w-full h-11 px-4 border-2 border-[#7C4D25] rounded-[10px] focus:outline-none"
              required
            />
          </div>

          {/* 면접평가 */}
          <div className="mb-6">
            <label className="block text-lg font-semibold text-black mb-2">면접평가</label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full h-[140px] px-4 py-2 border-2 border-[#7C4D25] rounded-[10px] focus:outline-none resize-none"
              required
            />
          </div>

          {/* 평점 */}
          <div className="flex gap-16 mb-8">
            {/* 면접 난이도 */}
            <div>
              <label className="block text-lg font-semibold text-black mb-2">면접 난이도</label>
              <div className="flex gap-2">
                {renderChecks(difficulty, 5, 'difficulty')}
              </div>
            </div>

            {/* 면접분위기 */}
            <div>
              <label className="block text-lg font-semibold text-black mb-2">면접분위기</label>
              <div className="flex gap-2">
                {renderChecks(mood, 5, 'mood')}
              </div>
            </div>
          </div>

          {/* 수정 버튼 */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-curpick-brown text-white rounded-lg hover:bg-[#6B4320] transition-colors"
            >
              수정하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewEditPage; 