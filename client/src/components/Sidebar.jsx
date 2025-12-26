import React from 'react';
import { useNavLogic } from '../hooks/useNavLogic'; // 훅 가져오기
import { FaHome, FaUser, FaCode, FaCommentDots, FaChartLine, FaBriefcase, FaBook, FaEnvelope, FaUserCog, FaSignOutAlt, FaSignInAlt, FaTimes } from 'react-icons/fa';

const Sidebar = ({isOpen, onClose, mode = "home"}) => {

    // 훅에서 기능만 빼기
    const { activeSection, scrollToSection, isLoggedIn, handleLogout, navigate, location } = useNavLogic();

    // Home인지 Admin 인지에 따라서 menu가 다름
    const homeMenu = [
        {id: 'about', label:'소개', icon: <FaUser/> },
        {id: 'projects', label:'프로젝트', icon: <FaCode/> },
        {id: 'guestbook', label:'방명록록', icon: <FaCommentDots/> },
        {id: 'contact', label:'문의하기', icon: <FaEnvelope/> },
    ];

    const adminMenu = [
        { id: 'profile', label: '프로필 관리', path: '/admin/profile', icon: <FaUser /> },
        { id: 'projects', label: '프로젝트 관리', path: '/admin/projects', icon: <FaCode /> },
        { id: 'messages', label: '메시지함', path: '/admin/messages', icon: <FaEnvelope /> },
    ];

    const menuItems = mode == 'admin' ? adminMenu : homeMenu;

    // 통합 네비게이션 핸들러
    const handleNavClick = (item) => {

        if(mode === 'home'){
            if(item === 'login'){
                navigate('/login');
                if(onClose) onClose();
                return;
            }    

            scrollToSection(item.id);
        }else {
            navigate(item.path);
        }

        //메뉴를 클릭했으면 모바일 사이드바는 닫혀야함
        if(onClose) onClose();
    };
    // 활성 상태 확인
    const checkActive = (item) => {
        if(mode === 'home'){
            return activeSection === item.id;
        }else {
            return location.pathname === item.path;
        }
    };

    return (
        <>
            <div
                className={`overlay ${isOpen ? 'visible' : ''}`}
                onClick={()=> setIsMobileMenuOpen(false)}
            ></div>
            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>

                {/* 모바일용 닫기버튼 */}
                <div
                    className="mobile-close-btn" // css에서 데스크탑에서 숨기기
                    onClick={onClose}
                >
                    {/* 데스크탑 화면에서는 안 보이게 처리 필요 */}
                    <FaTimes />
                </div>
                <div className="logo-area" 
                    onClick={()=> {
                        if(mode === 'home'){
                            if(location.pathname !== '/'){
                                navigate('/', {state: {targetId: 'about'}});
                                return;
                            }
                            window.scrollTo({ top: 0, behavior: 'smooth'});
                        }else{
                            navigate('/admin');
                        }
                        if(onClose) onClose();
                    }}
                    style={{ cursor : 'pointer' }}
                    >
                    {mode === 'admin' ? 'ADMIN' : 'HoJunior'}
                </div>

                <nav className="nav-menu">
                    {menuItems.map((item) => (
                        <div
                            key={item.id}
                            className={`nav-item ${checkActive(item) ? 'active' : ''}`}
                            onClick={() => { handleNavClick(item) }}
                        >
                            <span style={{ marginRight: '10px', display:'flex', alignItems:'center' }}>
                                {item.icon}
                            </span>
                            {item.label}
                        </div>
                    ))}
                </nav>

                {/* 하단 관리자/로그인 영역 (Spacer로 밀어버림) */}
                <div style={{ marginTop: 'auto' }}>
                    {isLoggedIn ? (
                    <>
                        {mode === 'home' && (
                            <div className="nav-item" onClick={()=> navigate('/admin')} >
                                <span style={{ marginRight: '10px' }}><FaUserCog /></span>
                                관리자
                            </div>
                        )}

                        {/* Admin 모드일 때는 '홈으로 가기' 버튼 보이기 (선택사항) */}
                        {mode === 'admin' && (
                            <div className="nav-item" onClick={() => navigate('/')}>
                                <span style={{ marginRight: '10px' }}><FaHome /></span>
                                홈으로
                            </div>
                        )}

                        <div className="nav-item" onClick={handleLogout} style={{ color: '#ff6b6b' }}>
                            <span style={{ marginRight: '10px' }}><FaSignOutAlt /></span>
                            로그아웃
                        </div>
                    </>
                    ) : (
                        <div className="nav-item" onClick={() => handleNavClick('login')}>
                             <span style={{ marginRight: '10px' }}><FaSignInAlt /></span>
                             로그인
                        </div>
                    )}
                </div>
            </aside>
        </>
    )
}

export default Sidebar;