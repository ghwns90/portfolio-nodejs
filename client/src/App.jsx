import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import RequireAuth from './components/RequireAuth';
import { useAuthCheck } from './hooks/useAuthCheck';
import {FaHome, FaProjectDiagram} from 'react-icons/fa'; 
import Sidebar from './components/Sidebar';
import MobileNavbar from './components/MobileNavbar';
import { useState } from 'react';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import './App.css'

function App() {

  const { isLoggedIn, isLoading } = useAuthCheck();

  useScrollAnimation();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if(isLoading){
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
        <h3>Loading... ⏳</h3>
      </div>
    );
  }
  
  return (
    <div className="app-container">

      <div
        className={`overlay ${isMobileMenuOpen ? 'visible' : ''}`}
        onClick={()=> setIsMobileMenuOpen(false)}
      ></div>
      <Sidebar isOpen={isMobileMenuOpen} onClose={()=> setIsMobileMenuOpen(false)}/>
      <MobileNavbar onOpen={()=> setIsMobileMenuOpen(true)}/>
      
      {/* 3. 메인 컨텐츠 */}
      <main className="main-content">
        <Routes>
            {/* path="/" : 메인 주소로 오면 <Home />을 보여줘라 */}
            <Route path="/" element={<Home />} />
            
            {/* path="/admin" : 관리자 주소로 오면 <Admin />을 보여줘라 */}
            <Route path="/login" element={<Login />} />

            <Route path="/admin" element={<RequireAuth><Admin /></RequireAuth>} />
        </Routes>
      </main>
      
    </div>    
  );
}

export default App;
