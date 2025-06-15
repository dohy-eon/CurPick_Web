import React, { createContext, useContext, useState, useEffect } from 'react';

// 사용자 컨텍스트 인터페이스 정의
interface UserContextType {
  nickname: string | null;
  isLoggedIn: boolean;
  userId: number | null;
  setNickname: (nickname: string | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUserId: (userId: number | null) => void;
}

// 사용자 컨텍스트 생성
const UserContext = createContext<UserContextType | undefined>(undefined);

// 사용자 컨텍스트 프로바이더 컴포넌트
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [nickname, setNickname] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);

  // 컴포넌트 마운트 시 로컬 스토리지에서 사용자 정보 복원
  useEffect(() => {
    const storedNickname = localStorage.getItem('nickname');
    const storedUserId = localStorage.getItem('userId');
    
    if (storedNickname) {
      setNickname(storedNickname);
      setIsLoggedIn(true);
    }
    
    if (storedUserId) {
      setUserId(parseInt(storedUserId, 10));
    }
  }, []);

  // 사용자 정보가 변경될 때마다 로컬 스토리지 업데이트
  useEffect(() => {
    if (nickname) {
      localStorage.setItem('nickname', nickname);
    } else {
      localStorage.removeItem('nickname');
    }
  }, [nickname]);

  useEffect(() => {
    if (userId) {
      localStorage.setItem('userId', userId.toString());
    } else {
      localStorage.removeItem('userId');
    }
  }, [userId]);

  return (
    <UserContext.Provider
      value={{
        nickname,
        isLoggedIn,
        userId,
        setNickname,
        setIsLoggedIn,
        setUserId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// 사용자 컨텍스트 사용을 위한 커스텀 훅
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 