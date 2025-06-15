import React from 'react';
// import Header from '../components/Header';
import MetaBalls from '../blocks/Animations/MetaBalls/MetaBalls';

const HomePage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-white">
      <div className="absolute inset-0 w-full h-full">
        <MetaBalls enableTransparency={true} />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 container mx-auto flex flex-col items-center justify-center">
        {/* 로고 */}
        <div className="text-[100px] font-logo text-transparent bg-clip-text bg-gradient-to-r from-white to-curpick-brown drop-shadow-[0_0_0.1px_theme('colors.curpick-brown')]">
          CurPick
        </div>

        {/* 설명 문구 */}
        <p className="text-center text-black text-[20px] font-luxgom">
          미래 진로가 고민이 된다면, 한 큐에 모아보는 커리어 피드
        </p>
      </div>
    </div>
  );
};

export default HomePage;