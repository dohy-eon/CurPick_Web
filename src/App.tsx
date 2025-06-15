import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import InterviewReviewPage from './pages/InterviewReviewPage';
import ReviewDetailPage from './pages/ReviewDetailPage';
import ReviewEditPage from './pages/ReviewEditPage';
import JobPostings from './pages/JobPostings';
import CoffeeChat from './pages/CoffeeChat';
import AdminPage from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Header />
          <main>
            <Routes>
              {/* 홈페이지 */}
              <Route path="/" element={<HomePage />} />
              
              {/* 인증 관련 페이지 */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              
              {/* 관리자 페이지 */}
              <Route path="/admin/users" element={<AdminPage />} />
              
              {/* 프로필 페이지 */}
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;