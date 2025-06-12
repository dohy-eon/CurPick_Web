import React from 'react';
import InterviewReview from '../components/InterviewReview';
import { IoIosArrowForward } from 'react-icons/io';

const InterviewReviewPage: React.FC = () => {
  const mockReviews = [
    {
      id: 1,
      company: "(주) 에뛰드",
      interviewerCount: 3,
      review: "해당 직무와 인사 관련 면접을 진행 하였고 1차 면접 합격 후 2차 면접 을 진행하고 최종 합격함 합격 후 인적성 검사 진행하였음",
      difficulty: 3,
      mood: 4,
      createdAt: "2024-03-20T10:00:00",
      updatedAt: "2024-03-20T10:00:00",
      companyLogo: "/path/to/etude-logo.png"
    },
    {
      id: 2,
      company: "카카오",
      interviewerCount: 2,
      review: "분위기는 편안했지만 질문은 다소 날카로웠어요. 기술 면접과 인성 면접이 함께 진행되었습니다.",
      difficulty: 4,
      mood: 3,
      createdAt: "2024-03-19T15:00:00",
      updatedAt: "2024-03-19T15:00:00",
      companyLogo: "/path/to/kakao-logo.png"
    }
  ];

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-[1200px] mx-auto space-y-8">
        <div className="flex justify-end">
          <button className="bg-curpick-brown text-white px-3 py-2 text-lg flex items-center gap-2">
            지금 면접 후기 공유하기 <IoIosArrowForward className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-8">
          {mockReviews.map((review) => (
            <InterviewReview key={review.id} {...review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InterviewReviewPage; 