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
    return localStorage.getItem('nickname');
  });
  
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const accessToken = localStorage.getItem('accessToken');
    const savedNickname = localStorage.getItem('nickname');
    return Boolean(accessToken && savedNickname);
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
    if (isLoggedIn) {
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('authority');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (userId) {
      localStorage.setItem('userId', userId.toString());
    } else {
      localStorage.removeItem('userId');
    }
  }, [userId]);

  // 로그아웃 처리 함수
  const handleLogout = () => {
    setNickname(null);
    setUserId(null);
    setIsLoggedIn(false);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('authority');
    localStorage.removeItem('nickname');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
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