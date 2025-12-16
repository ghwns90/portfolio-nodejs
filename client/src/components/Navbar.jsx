import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar(){

    const navigate = useNavigate();
    const location = useLocation(); // 현재 내가 어떤 주소에 있는지 알려줌
    // 현재 어떤 섹션이 활성화되었는지 기억하는 변수
    // 기본값은 'about' (맨 위)
    const [activeSection, setActiveSection] = useState('about');
    // 지금 클릭해서 이동중인지? 를 기억하는 변수(렌더링 영향 X)
    const isNavigating = useRef(false);

    // 스크롤 종료 감지 타이머
    const scrollTimeout = useRef(null);

    // 스크롤 위치를 감시하는 함수 (Scroll Spy Logic)
    useEffect(()=>{
        // Home 화면이 아니면 감시할 필요 없음
        if(location.pathname !== '/') return;

        const handleScroll = () => {

            // Debounce
            // 스크롤 이벤트가 발생할 때마다 기존 타이머를 취소
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }
            // "0.1초 뒤에는 이동이 끝난 걸로 치자"라고 새 타이머 설정
            scrollTimeout.current = setTimeout(() => {
                // 0.1초 동안 스크롤 이벤트가 한 번도 안 오면 여기가 실행됨!
                isNavigating.current = false; // "도착했으니 눈 떠!"
            }, 100);

            // 만약 "이동 중(깃발 true)"이라면? -> 스파이 로직은 실행하지 않음 (return)
            if (isNavigating.current) return;
            
            const sections = document.querySelectorAll('.section-spacer');
            // 현재 스크롤 위치(Navbar 높이 70px 정도 여유를 줌)
            const scrollPosition = window.scrollY + 100;

            // 각 섹션을 돌면서 위치 확인
            for(const sectionId of sections){
                const element = document.getElementById(sectionId);
                if(!element) continue;

                // 요소의 시작위치와 끝 위치 계산
                const offsetTop = element.offsetTop;
                const offsetHeight = element.offsetHeight;

                // 현재 스크롤이 이 섹션안에 들어왔나? 확인
                if(scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight){
                    setActiveSection(sectionId); // 현재 섹션 업데이트
                }
            }
        };
        // 스크롤 할 때마다 handleScroll 실행해라! (이벤트 등록)
        window.addEventListener('scroll', handleScroll);

        // 청소하기 : 컴포넌트가 사라지면 감시도 그만둬야 함(메모리 누수 방지)
        return () => {
            window.removeEventListener('scroll', handleScroll);

            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        };
    }, []); // 주소가 바뀔 때마다 재실행

    // 메뉴 클릭 시 부드럽게 이동시키는 함수 (Smooth Scroll)
    const scrollToSection = (sectionId) => {
        // 홈이 아니면 홈으로 먼저 이동
        if(location.pathname !== '/'){
            navigate('/');
            setTimeout(()=> scrollToSection(sectionId), 100);
            return;
        }
        // 해당 아이디를 가진 요소를 찾음
        const element = document.getElementById(sectionId);
        if(element){
            // 이동 시작 전에 "나 이동 중이야!" 깃발 들기
            isNavigating.current = true;

            setActiveSection(sectionId);

            const headerOffset = 70;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth" // 부드럽게~
            });            
        }
    };


    // 로그인 했는지 확인
    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
        // 토큰 삭제
        localStorage.removeItem('token');
        alert('로그아웃 되었습니다.');

        navigate('/');

        window.location.reload();
    };

    return (
        <nav className="navbar">
            {/* 로고 누르면 맨 위로 이동 */}
            <div className="logo" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                HoJunior<span className="highlight" style={{color : "#007396"}}>Developer</span>
            </div>

            <div className="nav-menu">
                {/* 홈 섹션 */}
                <div 
                    className={`nav-link ${activeSection === 'about' ? 'active' : ''}`} 
                    onClick={() => scrollToSection('about')}
                >
                    소개
                </div>
                {/* 프로젝트 섹션 */}
                <div 
                    className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`} 
                    onClick={() => scrollToSection('projects')}
                >
                    프로젝트
                </div>
                {/* 방명록 섹션 */}
                <div 
                    className={`nav-link ${activeSection === 'guestbook' ? 'active' : ''}`} 
                    onClick={() => scrollToSection('guestbook')}
                >
                    방명록
                </div>
                {/* 방명록 섹션 */}
                <div 
                    className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`} 
                    onClick={() => scrollToSection('contact')}
                >
                    Contact
                </div>
                {/* 관리자 페이지 */}
                {isLoggedIn ? (
                    <div className="flex-row">
                        <button
                            onClick={()=> navigate('/admin')}
                            className="btn btn-online"
                            style={{padding: '5px 10px', fontSize: '0.9rem'}}
                        >
                            ⚙️admin
                        </button>
                        <button 
                            onClick={handleLogout}
                            className="btn btn-dark"
                            style={{ padding: '5px 10px', fontSize: '0.9rem' }}
                        >
                            로그아웃    
                        </button>
                    </div>
                ) : (
                    <div
                        className="nav-link"
                        onClick={() => navigate('/login')}
                    >
                        login
                    </div>
                )}

            </div>
        </nav>
    );
}

export default Navbar;