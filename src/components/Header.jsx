import React from 'react';

const Header = () => {
  return (
    <header className="flex h-24 flex-col items-center justify-center gap-3 bg-green-500 text-white">
      <h1 className="text-2xl">Lunarcal</h1>
      <h4 className="text-sm font-normal">구글 캘린더에 음력 일정을 간편하게 저장하세요</h4>
    </header>
  );
};

export default Header;
