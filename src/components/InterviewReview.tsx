import React from 'react';
import { useNavigate } from 'react-router-dom';
import CurpickCheck from '../assets/CurpickCheck.svg';

interface InterviewReviewProps {
  id: number;
  company: string;
  interviewerCount: number;
  review: string;
  difficulty: number;
  mood: number;
  createdAt: string;
  updatedAt: string;
  companyLogo?: string;
}

const InterviewReview: React.FC<InterviewReviewProps> = ({
  id,
  company,
  interviewerCount,
  review,
  difficulty,
  mood,
  companyLogo
}) => {
  const navigate = useNavigate();

  const renderChecks = (count: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <img
        key={i}
        src={CurpickCheck}
        alt="check"
        className={`w-3 h-3 ${i < count ? 'opacity-100' : 'opacity-30'}`}
      />
    ));
  };

  const handleClick = () => {
    navigate(`/reviews/${id}`);
  };

  return (
    <div 
      className="w-[1200px] h-[400px] border border-curpick-brown rounded-lg p-4 relative cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleClick}
    >
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-xl font-semibold">{company}</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-curpick-brown mb-1">면접난이도</p>
                <div className="flex gap-1">
                  {renderChecks(difficulty)}
                </div>
              </div>
              <div>
                <p className="text-curpick-brown mb-1">면접분위기</p>
                <div className="flex gap-1">
                  {renderChecks(mood)}
                </div>
              </div>
            </div>

            <div>
              <p className="text-curpick-brown mb-1">면접인원</p>
              <p className="text-text-gray">면접관 {interviewerCount}명</p>
            </div>

            <div>
              <p className="text-curpick-brown mb-1">면접평가</p>
              <p className="text-text-gray whitespace-pre-line">{review}</p>
            </div>
          </div>

          <button 
            className="mt-4 bg-curpick-brown text-white px-4 py-2 rounded-lg"
            onClick={(e) => {
              e.stopPropagation();
              // 회사 위치 기능 구현
            }}
          >
            회사 위치
          </button>
        </div>

        {companyLogo && (
          <div className="w-[86px] h-[34px]">
            <img src={companyLogo} alt={company} className="w-full h-full object-contain" />
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewReview; 