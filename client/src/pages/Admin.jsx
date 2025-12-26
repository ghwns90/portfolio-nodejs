import { Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import MobileNavbar from '../components/MobileNavbar';

import '../App.css';

function Admin(){

    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('관리자 로그인이 필요합니다.');
            navigate('/login'); // 혹은 홈('/')으로
        }
    }, [navigate]);

    return (
        <div className="app-container">
            {/* 좌측 사이드바 */}
            <Sidebar 
                mode='admin' 
                isOpen={isMobileMenuOpen}
                onClose={()=> setIsMobileMenuOpen(false)}
            />

            <MobileNavbar onOpen={() => setIsMobileMenuOpen(true)} />            
            
            {/* 우측 콘텐츠 영역 */}
            <main className="main-content">
                <div className="admin-wrapper" style={{ padding: '20px', width: '100%' }}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default Admin;