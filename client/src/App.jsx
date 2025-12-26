import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import RequireAuth from './components/RequireAuth';
import MainLayout from './layouts/MainLayout';
import { useAuthCheck } from './hooks/useAuthCheck';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import ProjectManager from './components/admin/ProjectManager';
import ProfileEditor from './components/admin/ProfileEditor';
import MessageManager from './components/admin/MessageManager';
import './App.css'

function App() {

  const { isLoggedIn, isLoading } = useAuthCheck();

  useScrollAnimation();
  
  if(isLoading){
    return (
        <div style={{ 
            height: '100vh', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            background: '#000' // 전체 배경 검게
        }}>
          {/* 네온 효과가 들어간 스피너 */}
          <div className="loading-spinner"></div>
        </div>
      );
  }
  
  return (
    
    <Routes>
      {/* 일반 사용자용 (MainLayout 적용) */}
      <Route element={<MainLayout/>}>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
      </Route>
      {/* 관리자용 (Admin 레이아웃 적용) */}
      <Route path="/admin" element={<RequireAuth><Admin /></RequireAuth>} >
        <Route index element={<ProfileEditor />} />
        <Route path="profile" element={<ProfileEditor />} /> {/* /admin/profile */}
        <Route path="projects" element={<ProjectManager />} /> {/* /admin/projects */}
        <Route path="messages" element={<MessageManager />} /> {/* /admin/messages */}
      </Route>
    </Routes>
   
      
    
  );
}

export default App;
