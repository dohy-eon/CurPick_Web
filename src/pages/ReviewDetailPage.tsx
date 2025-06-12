import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoIosArrowBack } from 'react-icons/io';
import CurpickCheck from '../assets/CurpickCheck.svg';

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

const ReviewDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [review, setReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get<Review>(`https://localhost:8080/api/reviews/${id}`);
        setReview(response.data);
        setLoading(false);
      } catch (err) {
        setError('면접 후기를 불러오는데 실패했습니다.');
        setLoading(false);
      }
    };

    fetchReview();
  }, [id]);

  const renderChecks = (count: number, maxCount: number = 5) => {
    return Array.from({ length: maxCount }).map((_, index) => (
      <img
        key={index}
        src={CurpickCheck}
        alt="check"
        className={`w-6 h-6 ${index < count ? 'opacity-100' : 'opacity-30'}`}
      />
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

        {/* 회사명 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black">{review.company}</h1>
        </div>

        {/* 면접 정보 */}
        <div className="bg-white rounded-[20px] p-8 shadow-md mb-8">
          {/* 면접인원 */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-black mb-2">면접인원</h2>
            <p className="text-black">{review.interviewerCount}명</p>
          </div>

          {/* 면접평가 */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-black mb-2">면접평가</h2>
            <p className="text-black whitespace-pre-wrap">{review.review}</p>
          </div>

          {/* 평점 */}
          <div className="flex gap-16">
            {/* 면접 난이도 */}
            <div>
              <h2 className="text-lg font-semibold text-black mb-2">면접 난이도</h2>
              <div className="flex gap-2">
                {renderChecks(review.difficulty)}
              </div>
            </div>

            {/* 면접분위기 */}
            <div>
              <h2 className="text-lg font-semibold text-black mb-2">면접분위기</h2>
              <div className="flex gap-2">
                {renderChecks(review.mood)}
              </div>
            </div>
          </div>
        </div>

        {/* 작성일 */}
        <div className="text-right text-gray-500">
          작성일: {new Date(review.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default ReviewDetailPage; 