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

const ReviewDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [review, setReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isLoggedIn, userId } = useUser();

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get<Review>(`http://localhost:8080/api/reviews/${id}`);
        setReview(response.data);
        setLoading(false);
      } catch (err) {
        setError('면접 후기를 불러오는데 실패했습니다.');
        setLoading(false);
      }
    };

    fetchReview();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/api/reviews/${id}`);
      navigate('/reviews');
    } catch (err) {
      setError('게시글 삭제에 실패했습니다.');
    }
  };

  const handleEdit = () => {
    navigate(`/reviews/edit/${id}`);
  };

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

  const isAuthor = isLoggedIn && review.userId === userId;

  return (
    <div className="min-h-screen bg-[#F9F9FA] pt-24 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-black hover:text-gray-700 mb-8"
        >
          <IoIosArrowBack size={24} />
          <span>목록으로</span>
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black">{review.company}</h1>
        </div>

        <div className="bg-white rounded-[20px] p-8 shadow-md mb-8">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-black mb-2">면접인원</h2>
            <p className="text-black">{review.interviewerCount}명</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-black mb-2">면접평가</h2>
            <p className="text-black whitespace-pre-wrap">{review.review}</p>
          </div>

          <div className="flex gap-16">
            <div>
              <h2 className="text-lg font-semibold text-black mb-2">면접 난이도</h2>
              <div className="flex gap-2">
                {renderChecks(review.difficulty)}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-black mb-2">면접분위기</h2>
              <div className="flex gap-2">
                {renderChecks(review.mood)}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-gray-500">
            작성일: {new Date(review.createdAt).toLocaleDateString()}
          </div>
          
          {isAuthor && (
            <div className="flex gap-4">
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-curpick-brown text-white rounded-lg hover:bg-[#6B4320] transition-colors"
              >
                수정
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                삭제
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewDetailPage; 