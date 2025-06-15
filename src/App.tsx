import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import InterviewReviewPage from './pages/InterviewReviewPage';
import ReviewDetailPage from './pages/ReviewDetailPage';
import ReviewEditPage from './pages/ReviewEditPage';
import JobPostings from './pages/JobPostings';
import CoffeeChat from './pages/CoffeeChat';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="relative min-h-screen bg-[#F9F9FA]">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/reviews" element={<InterviewReviewPage />} />
            <Route path="/reviews/:id" element={<ReviewDetailPage />} />
            <Route path="/reviews/edit/:id" element={<ReviewEditPage />} />
            <Route path="/jobs" element={<JobPostings />} />
            <Route path="/coffee-chat" element={<CoffeeChat />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;