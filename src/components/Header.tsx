import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { useUser } from '../contexts/UserContext';

const Header: React.FC = () => {
  const { nickname, isLoggedIn, setNickname, setIsLoggedIn, setUserId } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setNickname(null);
    setIsLoggedIn(false);
    setUserId(null);
    navigate('/');
  };

  return (
    <header className="w-full h-[80px] bg-white">
      <div className="max-w-[1920px] h-full mx-auto px-10 flex items-center justify-between">
        {/* 로고 */}
        <Link
          to="/"
          className="text-[36px] font-logo text-transparent bg-clip-text bg-gradient-to-r from-white to-curpick-brown drop-shadow-[0_0_0.1px_theme('colors.curpick-brown')]"
        >
          CurPick
        </Link>

        {/* 네비게이션 메뉴 */}
        <nav className="flex items-center gap-8">
          <Link to="/jobs" className="text-black text-[28px] font-main hover:text-curpick-brown transition-colors duration-200">
            직업정보
          </Link>
          <Link to="/reviews" className="text-black text-[28px] font-main hover:text-curpick-brown transition-colors duration-200">
            면접후기
          </Link>
          <Link to="/coffee-chat" className="text-black text-[28px] font-main hover:text-curpick-brown transition-colors duration-200">
            커피챗
          </Link>
          {isLoggedIn && (
            <Link to="/admin/users" className="text-black text-[28px] font-main hover:text-curpick-brown transition-colors duration-200">
              관리자
            </Link>
          )}
        </nav>

        {/* 인증 섹션 */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Link to="/profile" className="text-curpick-brown font-luxgom hover:text-curpick-brown/80">
                {nickname}님
              </Link>
              <button
                onClick={handleLogout}
                className="text-text-gray text-[20px] font-luxgom hover:text-curpick-brown transition-colors"
              >
                로그아웃
              </button>
            </div>
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
          {/* 검색 버튼 */}
          <button className="w-7 h-7 flex items-center justify-center">
            <CiSearch size={28} color="#7C4D25" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;