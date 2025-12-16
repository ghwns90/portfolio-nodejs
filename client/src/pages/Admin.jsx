import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileEditor from '../components/admin/ProfileEditor';
import ProjectManager from '../components/admin/ProjectManager';
import MessageManager from '../components/admin/MessageManager';

import '../App.css';

function Admin(){

    // 현재 어떤 탭이 선택되었는지 기억하는 변수 (기본값: 'profile')
    const [activeTab, setActiveTab] = useState('profile');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="admin-container">
            {/* 1. 좌측 사이드바 */}
            <aside className="sidebar">
                <h2 className="sidebar-logo">Admin Page</h2>
                
                <ul className="sidebar-menu">
                    <li 
                        className={activeTab === 'profile' ? 'active' : ''} 
                        onClick={() => setActiveTab('profile')}
                    >
                        👤 프로필 관리
                    </li>
                    <li 
                        className={activeTab === 'project' ? 'active' : ''} 
                        onClick={() => setActiveTab('project')}
                    >
                        📋 프로젝트 관리
                    </li>
                    <li 
                        className={activeTab === 'message' ? 'active' : ''} 
                        onClick={() => setActiveTab('message')}
                    >
                        📬 메시지함
                    </li>
                    {/* 나중에 방명록 관리 추가 가능 */}
                    <li onClick={() => navigate('/')} style={{ marginTop: 'auto', color: '#888' }}>
                        🏠 홈으로 가기
                    </li>
                    <li onClick={handleLogout} style={{ color: 'var(--danger-color)' }}>
                        🚪 로그아웃
                    </li>
                </ul>
            </aside>

            {/* 2. 우측 콘텐츠 영역 */}
            <main className="admin-content">
                <h2 className="page-title">
                    {activeTab === 'profile' && '프로필 설정'}
                    {activeTab === 'project' && '프로젝트 관리'}
                    {activeTab === 'message' && '문의 관리'}
                </h2>
                
                <div className="content-box">
                    {activeTab === 'profile' && <ProfileEditor />}
                    {activeTab === 'project' && <ProjectManager />}
                    {activeTab === 'message' && <MessageManager />}
                </div>
            </main>
        </div>
    );
}

export default Admin;