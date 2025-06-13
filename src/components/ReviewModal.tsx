import React, { useState } from 'react';
import { IoIosClose, IoIosArrowDown } from 'react-icons/io';
import CurpickCheck from '../assets/CurpickCheck.svg';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (review: {
    company: string;
    interviewerCount: number;
    review: string;
    difficulty: number;
    mood: number;
  }) => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [company, setCompany] = useState('');
  const [interviewerCount, setInterviewerCount] = useState(1);
  const [review, setReview] = useState('');
  const [difficulty, setDifficulty] = useState(3);
  const [mood, setMood] = useState(3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      company,
      interviewerCount,
      review,
      difficulty,
      mood,
    });
  };

  if (!isOpen) return null;

  const renderChecks = (count: number, maxCount: number = 5, type: 'difficulty' | 'mood') => {
    return Array.from({ length: maxCount }).map((_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => {
          if (type === 'difficulty') {
            setDifficulty(index + 1);
          } else {
            setMood(index + 1);
          }
        }}
        className="focus:outline-none"
      >
        <img
          src={CurpickCheck}
          alt="check"
          className={`w-6 h-6 ${index < count ? 'opacity-100' : 'opacity-30'}`}
        />
      </button>
    ));
  };

  return (
    <div className="fixed top-[-100px] left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
      <div className="bg-[#F9F9FA] w-[1200px] h-[760px] rounded-[20px] shadow-lg relative">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-black hover:text-gray-700"
        >
          <IoIosClose size={40} />
        </button>

        {/* 제목 */}
        <div className="text-center mt-12">
          <h2 className="text-[62px] font-logo text-transparent bg-clip-text bg-gradient-to-r from-white to-curpick-brown drop-shadow-[0_0_0.1px_theme('colors.curpick-brown')]">
            CurPick
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="px-12 mt-8">
          {/* 회사명 */}
          <div className="mb-6">
            <div className="flex justify-center">
              <div className="w-[925px]">
                <label className="block text-black text-lg mb-2">회사명</label>
                <div className="relative">
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full h-11 border-2 border-[#7C4D25] rounded-[10px] px-4"
                    placeholder="회사명찾기"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 면접인원 */}
          <div className="mb-6">
            <div className="flex justify-center">
              <div className="w-[925px]">
                <label className="block text-black text-lg mb-2">면접인원</label>
                <div className="relative">
                  <input
                    type="number"
                    value={interviewerCount}
                    onChange={(e) => setInterviewerCount(Number(e.target.value))}
                    min="1"
                    className="w-full h-11 border-2 border-[#7C4D25] rounded-[10px] px-4"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 면접평가 */}
          <div className="mb-6">
            <div className="flex justify-center">
              <div className="w-[925px]">
                <label className="block text-black text-lg mb-2">면접평가</label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full h-[140px] border-2 border-[#7C4D25] rounded-[10px] p-4 resize-none"
                />
              </div>
            </div>
          </div>

          {/* 평점 */}
          <div className="flex justify-center gap-16 mb-12">
            {/* 면접 난이도 */}
            <div>
              <label className="block text-black text-lg mb-2">면접 난이도</label>
              <div className="flex gap-2">
                {renderChecks(difficulty, 5, 'difficulty')}
              </div>
            </div>

            {/* 면접분위기 */}
            <div>
              <label className="block text-black text-lg mb-2">면접분위기</label>
              <div className="flex gap-2">
                {renderChecks(mood, 5, 'mood')}
              </div>
            </div>
          </div>

          {/* 등록 버튼 */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-curpick-brown text-[#F9F9FA] px-6 py-2 rounded-[10px] shadow-md hover:bg-[#6B4320] transition-colors"
            >
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal; 