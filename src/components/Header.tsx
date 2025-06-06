import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import { useUser } from '../contexts/UserContext';

const Header: React.FC = () => {
  const { nickname, isLoggedIn } = useUser();
  return (
    <header className="w-full h-[80px] bg-white">
      <div className="max-w-[1920px] h-full mx-auto px-10 flex items-center justify-between">
        {/* Logo */}
        <Link
        to="/"
        className="text-[36px] font-logo text-transparent bg-clip-text bg-gradient-to-r from-white to-curpick-brown drop-shadow-[0_0_0.1px_theme('colors.curpick-brown')]">CurPick
        </Link>

        {/* 네비게이션  */}
        <nav className="flex items-center gap-8">
          <Link to="/jobs" className="text-black text-[28px] font-main">
            채용공고
          </Link>
          <Link to="/reviews" className="text-black text-[28px] font-main">
            면접후기
          </Link>
          <Link to="/coffee-chat" className="text-black text-[28px] font-main">
            커피챗
          </Link>
        </nav>

        {/* 인증  */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <span className="text-curpick-brown font-luxgom">{nickname}님</span>
          ) : (
            <>
              <Link
                to="/login"
                className="text-text-gray text-[20px] font-luxgom"
              >
                로그인
              </Link>
              <Link
                to="/signup"
                className="text-text-gray text-[20px] font-luxgom"
              >
                회원가입
              </Link>
            </>
          )}
          <button className="w-7 h-7 flex items-center justify-center">
            <CiSearch size={28} color="#7C4D25" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;