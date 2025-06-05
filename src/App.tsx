import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';
import { Counter } from './components/Counter';
import Header from './components/Header';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <Header />
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* 메인 컨텐츠 */}
              <div className="p-8">
                <Counter />
              </div>

              {/* 푸터 */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                <p className="text-sm text-gray-500 text-center">
                  React Kit CLI로 생성된 Redux 데모 프로젝트
                </p>
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
