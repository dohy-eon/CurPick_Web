import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface UserContextType {
  nickname: string | null;
  setNickname: (nickname: string | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  userId: number | null;
  setUserId: (userId: number | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [nickname, setNickname] = useState<string | null>(() => {
    const savedNickname = localStorage.getItem('nickname');
    console.log('초기 닉네임 로드:', savedNickname);
    return savedNickname ? savedNickname : null;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedLoginState = localStorage.getItem('isLoggedIn');
    console.log('초기 로그인 상태 로드:', savedLoginState);
    return savedLoginState === 'true';
  });
  const [userId, setUserId] = useState<number | null>(() => {
    const savedUserId = localStorage.getItem('userId');
    console.log('초기 userId 로드:', savedUserId);
    return savedUserId ? parseInt(savedUserId) : null;
  });

  useEffect(() => {
    console.log('닉네임 변경 감지:', nickname);
    if (nickname) {
      localStorage.setItem('nickname', nickname);
      console.log('닉네임 저장됨:', nickname);
    } else {
      localStorage.removeItem('nickname');
      console.log('닉네임 삭제됨');
    }
  }, [nickname]);

  useEffect(() => {
    console.log('로그인 상태 변경 감지:', isLoggedIn);
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
    console.log('로그인 상태 저장됨:', isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    console.log('userId 변경 감지:', userId);
    if (userId) {
      localStorage.setItem('userId', userId.toString());
      console.log('userId 저장됨:', userId);
    } else {
      localStorage.removeItem('userId');
      console.log('userId 삭제됨');
    }
  }, [userId]);

  return (
    <UserContext.Provider value={{ nickname, setNickname, isLoggedIn, setIsLoggedIn, userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 