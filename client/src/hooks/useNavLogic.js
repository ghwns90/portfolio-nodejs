import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useNavLogic = () => {

    const navigate = useNavigate();
    const location = useLocation(); // 현재 내가 어떤 주소에 있는지 알려줌
    // 현재 어떤 섹션이 활성화되었는지 기억하는 변수
    // 기본값은 'about' (맨 위)
    const [activeSection, setActiveSection] = useState('about');
    // 지금 클릭해서 이동중인지? 를 기억하는 변수(렌더링 영향 X)
    const isNavigating = useRef(false);

    // 스크롤 종료 감지 타이머
    const scrollDebounceTimer = useRef(null);

    // 스크롤 위치를 감시하는 함수 (Scroll Spy Logic)
    useEffect(()=>{
        // Home 화면이 아니면 감시할 필요 없음
        if(location.pathname !== '/') return;

        const handleScroll = () => {

            // Debounce
            // 스크롤 이벤트가 발생할 때마다 기존 타이머를 취소
            if (scrollDebounceTimer.current) {
                clearTimeout(scrollDebounceTimer.current);
            }

            // 새로운 타이머 설정: "0.1초 뒤에도 소식 없으면 끝난 걸로 알게!"
            scrollEndTimer.current = setTimeout(() => {
                // 여기가 실행됐다는 건 스크롤이 진짜 멈췄다는 뜻
                isNavigating.current = false; 
            }, 100);

            if (isNavigating.current) return;            
            
            const sections = document.querySelectorAll('.section-spacer');
            const scrollPosition = window.scrollY + (window.innerHeight / 3);

            for (const section of sections) {
                if (!section) continue;

                const elementTop = section.getBoundingClientRect().top + window.scrollY;
                const elementBottom = elementTop + section.offsetHeight;

                if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
                    setActiveSection(section.id);
                    break; 
                }
            }
            
        };    

        // 스크롤 할 때마다 handleScroll 실행해라! (이벤트 등록)
        window.addEventListener('scroll', handleScroll);

        // 청소하기 : 컴포넌트가 사라지면 감시도 그만둬야 함(메모리 누수 방지)
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollDebounceTimer.current) clearTimeout(scrollDebounceTimer.current);
        };
    }, [location.pathname]); // 주소가 바뀔 때마다 재실행

    useEffect(()=> {
        // 홈 화면이고, state에 targetId가 들어있다면?
        if(location.pathname === '/' && location.state?.targetId) {
            const targetId = location.state.targetId;

            isNavigating.current = true;
            setActiveSection(targetId);

            setTimeout(()=> {
                const element = document.getElementById(targetId);
                if(element){
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - (window.innerHeight / 4);

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                }else{
                    isNavigating.current = false;
                }                
            }, 300);

            navigate('/', { replace: true, state: {} });
        }
    }, [location]);
    // 부드러운 이동 로직
    const scrollToSection = (sectionId) => {

        if (location.pathname !== '/') {
            navigate('/', { state : {targetId: sectionId }});
            return;
        }
        
        const element = document.getElementById(sectionId);
        if (element) {
            isNavigating.current = true;
            setActiveSection(sectionId); // 클릭하자마자 활성화
        
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - (window.innerHeight / 4); // 사이드바라 상단 여백 많이 필요 없음

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

        }
    };

    // 3. 로그아웃 로직
    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken'); // 둘다 지우기!
        alert('로그아웃 되었습니다.');
        navigate('/');
        window.location.reload();
    };

    // 디자인 컴포넌트들이 갖다 쓸 수 있게 리턴
    return { activeSection, scrollToSection, isLoggedIn, handleLogout, navigate, location };
};