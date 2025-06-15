import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CurpickCheck from '../assets/CurpickCheck.svg';

interface Job {
  jobClcd: string;
  jobClcdNM: string;
  jobCd: string;
  jobNm: string;
}

interface JobCardProps {
  title: string;
  description: string;
}

const JobCard: React.FC<JobCardProps> = ({ title, description }) => {
  return (
    <div className="w-[559px] h-[118px] border-3 border-curpick-brown rounded-[20px] p-4">
      <div className="flex items-start gap-4">
        <div className="w-[49px] h-[60px]">
          <img src={CurpickCheck} alt="curpick check" className="w-full h-full object-contain" />
        </div>
        <div className="flex flex-col">
          <h3 className="text-black text-xl font-medium">{title}</h3>
          <p className="text-curpick-brown text-lg">{description}</p>
        </div>
      </div>
    </div>
  );
};

const JobPostings: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const totalPages = Math.ceil(total / itemsPerPage);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Job[]>(`http://localhost:8080/api/worknet/jobs`, {
          params: {
            page: currentPage,
            size: itemsPerPage
          }
        });
        setJobs(response.data);
        setTotal(537);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'Failed to fetch jobs');
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pages = [];
    const showPages = 5; // 보여줄 페이지 수
    const halfShowPages = Math.floor(showPages / 2);

    // 시작과 끝 페이지 계산
    let startPage = Math.max(1, currentPage - halfShowPages);
    let endPage = Math.min(totalPages, startPage + showPages - 1);

    // endPage가 totalPages에 가까우면 startPage 조정
    if (endPage === totalPages) {
      startPage = Math.max(1, endPage - showPages + 1);
    }

    // 첫 페이지
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-4 py-2 border border-curpick-brown rounded-md text-curpick-brown"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="start-ellipsis" className="px-2">
            ...
          </span>
        );
      }
    }

    // 페이지 번호들
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 rounded-md ${
            currentPage === i
              ? 'bg-curpick-brown text-white'
              : 'border border-curpick-brown text-curpick-brown'
          }`}
        >
          {i}
        </button>
      );
    }

    // 마지막 페이지
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="end-ellipsis" className="px-2">
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-4 py-2 border border-curpick-brown rounded-md text-curpick-brown"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-8 flex items-center justify-center">
        <div className="text-curpick-brown text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white p-8 flex items-center justify-center">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-[1920px] mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-curpick-brown text-xl mb-4 font-luxgom">현재 {total}개의 직업정보를 커픽에서 찾아볼 수 있어요!</h1>
          <h2 className="text-curpick-brown text-2xl font-luxgom font-bold">아래 직업들 중에서 미래 진로를 고민해보는건 어때요?</h2>
        </div>
        
        <div className="flex flex-wrap justify-between gap-8 mb-8">
          {jobs.map((job) => (
            <JobCard
              key={job.jobCd}
              title={job.jobNm}
              description={job.jobClcdNM}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-curpick-brown rounded-md text-curpick-brown disabled:opacity-50 disabled:cursor-not-allowed"
          >
            이전
          </button>
          
          {renderPagination()}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-curpick-brown rounded-md text-curpick-brown disabled:opacity-50 disabled:cursor-not-allowed"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobPostings; 