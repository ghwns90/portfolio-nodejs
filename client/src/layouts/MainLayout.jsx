import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import MobileNavbar from '../components/MobileNavbar';

const MainLayout = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="app-container">

      {/* home 사이드바 */}
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={()=> setIsMobileMenuOpen(false)}
        mode="home"
      />
      {/* 모바일 상단바 */}
      <MobileNavbar onOpen={()=> setIsMobileMenuOpen(true)} />

      {/* 메인 컨텐츠 */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
};

export default MainLayout;