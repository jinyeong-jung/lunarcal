import React from 'react';

const Header = () => {
  return (
    <header className="mx-auto flex h-24 max-w-screen-2xl items-center justify-between bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 px-6 text-white sm:px-8 lg:px-10">
      <div className="flex items-center gap-3">
        <img src="/logo_white.png" alt="logo" className="h-10" />
        <h1 className="text-2xl">Lunarcal</h1>
      </div>
      <h4 className="text-sm font-normal">구글 캘린더에 음력 일정을 간편하게 저장하세요!</h4>
    </header>
  );
};

export default Header;
