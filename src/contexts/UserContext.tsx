import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface UserContextType {
  nickname: string | null;
  setNickname: (nickname: string | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  userId: number | null;
  setUserId: (userId: number | null) => void;
  handleLogout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [nickname, setNickname] = useState<string | null>(() => {
    const savedNickname = localStorage.getItem('nickname');
    return savedNickname ? savedNickname : null;
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const savedLoginState = localStorage.getItem('isLoggedIn');
    const savedUserId = localStorage.getItem('userId');
    const savedNickname = localStorage.getItem('nickname');
    // userId와 nickname이 모두 있으면 로그인 상태로 간주
    return Boolean(savedLoginState === 'true' && savedUserId && savedNickname);
  });
  const [userId, setUserId] = useState<number | null>(() => {
    const savedUserId = localStorage.getItem('userId');
    return savedUserId ? parseInt(savedUserId) : null;
  });

  useEffect(() => {
    if (nickname) {
      localStorage.setItem('nickname', nickname);
    } else {
      localStorage.removeItem('nickname');
    }
  }, [nickname]);

  useEffect(() => {
    // 로그인 상태가 변경될 때만 localStorage 업데이트
    if (isLoggedIn) {
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      localStorage.removeItem('isLoggedIn');
    }
    console.log('로그인 상태 저장됨:', isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    if (userId) {
      localStorage.setItem('userId', userId.toString());
      console.log('userId 저장됨:', userId);
    } else {
      localStorage.removeItem('userId');
      console.log('userId 삭제됨');
    }
  }, [userId]);

  // 로그아웃 처리 함수
  const handleLogout = () => {
    setNickname(null);
    setUserId(null);
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  };

  return (
    <UserContext.Provider value={{ 
      nickname, 
      setNickname, 
      isLoggedIn, 
      setIsLoggedIn, 
      userId, 
      setUserId,
      handleLogout 
    }}>
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