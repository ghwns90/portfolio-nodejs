import React from 'react';
import { useNavLogic } from '../hooks/useNavLogic'; // 훅 가져오기
import { FaHome, FaBriefcase, FaBook, FaEnvelope, FaUserCog, FaSignOutAlt, FaSignInAlt, FaTimes } from 'react-icons/fa';

const Sidebar = ({isOpen, onClose}) => {
    // 훅에서 기능만 빼기
    const { activeSection, scrollToSection, isLoggedIn, handleLogout, navigate} = useNavLogic();

    const handleMenuClick = (section) => {
        scrollToSection(section);
        if(onClose) onClose();
    };

    return (
        <>
            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>

                {/* 모바일용 닫기버튼 */}
                <div
                    style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer' }}
                    className="mobile-close-btn" // css에서 데스크탑에서 숨기기
                    onClick={onClose}
                >
                    {/* 데스크탑 화면에서는 안 보이게 처리 필요 */}
                    {window.innerWidth <= 768 && <FaTimes size={24} color="#fff" />}
                </div>
                <div className="logo-area" onClick={()=>window.scrollTo({top:0, behavior:'smooth'})} style={{cursor:'pointer'}}>
                    HoJunior
                </div>

                <nav className="nav-menu">
                    <div 
                        className={`nav-item ${activeSection === 'about' ? 'active' : ''}`} 
                        onClick={() => handleMenuClick('about')}
                    >
                        <FaHome /> 소개
                    </div>

                    <div 
                        className={`nav-item ${activeSection === 'projects' ? 'active' : ''}`} 
                        onClick={() => handleMenuClick('projects')}
                    >
                        <FaBriefcase /> 프로젝트
                    </div>

                    <div 
                        className={`nav-item ${activeSection === 'guestbook' ? 'active' : ''}`} 
                        onClick={() => handleMenuClick('guestbook')}
                    >
                        <FaBook /> 방명록
                    </div>

                    <div 
                        className={`nav-item ${activeSection === 'contact' ? 'active' : ''}`} 
                        onClick={() => handleMenuClick('contact')}
                    >
                        <FaEnvelope /> 문의하기
                    </div>
                </nav>

                {/* 하단 관리자/로그인 영역 (Spacer로 밀어버림) */}
                <div style={{ marginTop: 'auto' }}>
                    {isLoggedIn ? (
                    <>
                        <div className="nav-item" onClick={() => navigate('/admin')}>
                            <FaUserCog /> 관리자
                        </div>
                        <div className="nav-item" onClick={handleLogout} style={{ color: '#ff6b6b' }}>
                            <FaSignOutAlt /> 로그아웃
                        </div>
                    </>
                    ) : (
                        <div className="nav-item" onClick={() => navigate('/login')}>
                            <FaSignInAlt /> 로그인
                        </div>
                    )}
                </div>
            </aside>
        </>
    )
}

export default Sidebar;