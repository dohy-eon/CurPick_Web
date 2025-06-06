import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setNickname, setIsLoggedIn } = useUser();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username,
        password
      });
      
      console.log('로그인 성공 :', response.data);
      setNickname(response.data.nickname);
      setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      console.error('로그인 실패 :', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F9FA]">
      <div className="w-[1200px] h-[460px] bg-white rounded-[20px] shadow-lg relative">
        {/* 닫기 버튼  */}
        <Link
          to="/"
          className="absolute top-6 right-6 w-6 h-6 text-black hover:opacity-70"
        >
          <AiOutlineClose size={24} />
        </Link>

        {/* 로고  */}
        <div className="flex flex-col items-center mt-12">
          <h1 className="text-[44px] font-logo text-transparent bg-clip-text bg-gradient-to-r from-white to-curpick-brown drop-shadow-[0_0_0.1px_theme('colors.curpick-brown')]">
            CurPick
          </h1>
          <div className="flex items-center mt-4">
            <span className="text-black text-[20px] font-luxgom">로그인</span>
            <div className="w-7 h-[3px] bg-black mx-2"></div>
            <Link to="/signup" className="text-text-gray text-[20px] font-luxgom hover:text-curpick-brown transition-colors">
              회원가입
            </Link>
          </div>
        </div>

        {/* 폼  */}
        <div className="mt-12 px-24">
          <div className="mb-6 flex items-center">
            <label className="w-[84px] text-black text-[20px] font-luxgom">아이디</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="아이디를 입력해주세요"
              className="flex-1 h-11 px-4 border-2 border-curpick-brown rounded-[10px] focus:outline-none text-[16px] font-luxgom"
            />
          </div>

          <div className="mb-8 flex items-center">
            <label className="w-[84px] text-black text-[20px] font-luxgom">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요"
              className="flex-1 h-11 px-4 border-2 border-curpick-brown rounded-[10px] focus:outline-none text-[16px] font-luxgom"
            />
          </div>

          {/* 로그인 버튼  */}
          <div className="flex justify-center">
            <button
              onClick={handleLogin}
              className="w-[184px] h-[45px] border border-curpick-brown rounded-[5px] text-curpick-brown hover:bg-curpick-brown hover:text-white transition-colors text-[20px] font-luxgom"
            >
              로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 