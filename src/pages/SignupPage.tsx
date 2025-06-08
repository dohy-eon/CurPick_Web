import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';

const SignupPage: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [emailStatus, setEmailStatus] = useState<{
    type: 'success' | 'error' | 'loading' | null;
    message: string;
  }>({ type: null, message: '' });
  const [verificationStatus, setVerificationStatus] = useState<{
    type: 'success' | 'error' | 'loading' | null;
    message: string;
  }>({ type: null, message: '' });
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/signup', {
        nickname,
        username,
        password,
        passwordConfirm,
        email,
        emailVerified: isEmailVerified
      });
      
      console.log('회원가입 성공 :', response.data);
      navigate('/login');
    } catch (error) {
      console.error('실패 :', error);
    }
  };

  const handleEmailVerification = async () => {
    if (!email) {
      setEmailStatus({
        type: 'error',
        message: '이메일을 입력해주세요.'
      });
      return;
    }

    setEmailStatus({ type: 'loading', message: '이메일 전송 중...' });
    try {
      const response = await axios.post('http://localhost:8080/api/email/send', {
        email,
        authCode: verificationCode
      });
      setEmailStatus({
        type: 'success',
        message: '인증번호가 이메일로 전송되었습니다.'
      });
      console.log('이메일 전송 완료 :', response.data);
    } catch (error) {
      setEmailStatus({
        type: 'error',
        message: '이메일 전송에 실패했습니다. 다시 시도해주세요.'
      });
      console.error('이메일 전송 실패 :', error);
    }
  };

  const handleVerificationCheck = async () => {
    if (!verificationCode) {
      setVerificationStatus({
        type: 'error',
        message: '인증번호를 입력해주세요.'
      });
      return;
    }

    setVerificationStatus({ type: 'loading', message: '인증번호 확인 중...' });
    try {
      const response = await axios.post('http://localhost:8080/api/email/verify', {
        email,
        authCode: verificationCode
      });
      setVerificationStatus({
        type: 'success',
        message: '이메일 인증이 완료되었습니다.'
      });
      setIsEmailVerified(true);
      console.log('이메일 인증 성공 :', response.data);
    } catch (error) {
      setVerificationStatus({
        type: 'error',
        message: '인증번호가 일치하지 않습니다.'
      });
      setIsEmailVerified(false);
      console.error('이메일 인증 실패 :', error);
    }
  };

  const getStatusColor = (type: 'success' | 'error' | 'loading' | null) => {
    switch (type) {
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      case 'loading':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F9FA]">
      <div className="w-[1200px] h-[840px] bg-white rounded-[20px] shadow-lg relative">
        {/* 닫기 버튼 */}
        <Link
          to="/"
          className="absolute top-6 right-6 w-6 h-6 text-black hover:opacity-70"
        >
          <AiOutlineClose size={24} />
        </Link>

        {/* 로고 */}
        <div className="flex flex-col items-center mt-12">
          <h1 className="text-[44px] font-logo text-transparent bg-clip-text bg-gradient-to-r from-white to-curpick-brown drop-shadow-[0_0_0.1px_theme('colors.curpick-brown')]">
            CurPick
          </h1>
          <div className="flex items-center mt-4">
            <Link to="/login" className="text-text-gray text-[20px] font-luxgom hover:text-curpick-brown transition-colors">
              로그인
            </Link>
            <div className="w-7 h-[3px] bg-black mx-2"></div>
            <span className="text-black text-[20px] font-luxgom">회원가입</span>
          </div>
        </div>

        {/* 폼 */}
        <div className="mt-12 px-12">
          {/* 닉네임 */}
          <div className="mb-6 flex items-center">
            <label className="w-[132px] text-black text-[20px] font-luxgom">닉네임</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력해주세요"
              className="flex-1 h-11 px-4 border-2 border-curpick-brown rounded-[10px] focus:outline-none text-[16px] font-luxgom"
            />
          </div>

          {/* 아이디 */}
          <div className="mb-6 flex items-center">
            <label className="w-[132px] text-black text-[20px] font-luxgom">아이디</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="아이디를 입력해주세요"
              className="flex-1 h-11 px-4 border-2 border-curpick-brown rounded-[10px] focus:outline-none text-[16px] font-luxgom"
            />
          </div>

          {/* 비밀번호 */}
          <div className="mb-6 flex items-center">
            <label className="w-[132px] text-black text-[20px] font-luxgom">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요"
              className="flex-1 h-11 px-4 border-2 border-curpick-brown rounded-[10px] focus:outline-none text-[16px] font-luxgom"
            />
          </div>

          {/* 비밀번호 확인 */}
          <div className="mb-6 flex items-center">
            <label className="w-[132px] text-black text-[20px] font-luxgom">비밀번호 확인</label>
            <input
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="비밀번호를 다시 입력해주세요"
              className="flex-1 h-11 px-4 border-2 border-curpick-brown rounded-[10px] focus:outline-none text-[16px] font-luxgom"
            />
          </div>

          {/* 이메일 */}
          <div className="mb-2 flex items-center">
            <label className="w-[132px] text-black text-[20px] font-luxgom">이메일</label>
            <div className="flex-1 flex gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력해주세요"
                className="flex-1 h-11 px-4 border-2 border-curpick-brown rounded-[10px] focus:outline-none text-[16px] font-luxgom"
              />
              <button
                onClick={handleEmailVerification}
                className="w-[140px] h-11 bg-curpick-brown text-white rounded-[10px] text-[20px] font-luxgom hover:opacity-90 transition-opacity"
              >
                이메일 인증
              </button>
            </div>
          </div>
          {emailStatus.type && (
            <div className={`ml-[132px] mb-4 text-[14px] ${getStatusColor(emailStatus.type)}`}>
              {emailStatus.message}
            </div>
          )}

          {/* 이메일 인증 */}
          <div className="mb-2 flex items-center">
            <label className="w-[132px] text-black text-[20px] font-luxgom">이메일 인증</label>
            <div className="flex-1 flex gap-4">
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="인증번호를 입력해주세요"
                className="flex-1 h-11 px-4 border-2 border-curpick-brown rounded-[10px] focus:outline-none text-[16px] font-luxgom"
              />
              <button
                onClick={handleVerificationCheck}
                className="w-[140px] h-11 bg-curpick-brown text-white rounded-[10px] text-[20px] font-luxgom hover:opacity-90 transition-opacity"
              >
                인증번호 확인
              </button>
            </div>
          </div>
          {verificationStatus.type && (
            <div className={`ml-[132px] mb-4 text-[14px] ${getStatusColor(verificationStatus.type)}`}>
              {verificationStatus.message}
            </div>
          )}

          {/* 가입하기 버튼 */}
          <div className="flex justify-center mt-8">
            <button
              onClick={handleSignup}
              className="w-[184px] h-[45px] border border-curpick-brown rounded-[5px] text-curpick-brown hover:bg-curpick-brown hover:text-white transition-colors text-[20px] font-luxgom"
            >
              가입하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage; 