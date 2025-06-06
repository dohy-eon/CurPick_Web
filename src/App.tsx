import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './store';
// import { Counter } from './components/Counter'; // Counter 컴포넌트는 더 이상 기본 경로에서 사용하지 않습니다.
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <Header /> {/* 헤더는 모든 페이지에 표시됩니다. */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            {/* 다른 라우트들을 여기에 추가할 수 있습니다. */}
            {/* 예: <Route path="/jobs" element={<JobsPage />} /> */}
          </Routes>
          {/* 푸터나 다른 공통 요소들을 여기에 추가할 수 있습니다. */}
           {/* 현재 푸터는 HomePage 내부에 포함되어 있습니다. 필요에 따라 이동 가능합니다. */}
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
