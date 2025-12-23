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
    }, [location.pathname]); // 주소가 바뀔 때마다 재실행

    // 2. 부드러운 이동 로직
    const scrollToSection = (sectionId) => {
        if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => scrollToSection(sectionId), 100);
        return;
        }
        
        const element = document.getElementById(sectionId);
        if (element) {
            isNavigating.current = true;
            setActiveSection(sectionId); // 클릭하자마자 활성화
        
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - 40; // 사이드바라 상단 여백 많이 필요 없음

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
    return { activeSection, scrollToSection, isLoggedIn, handleLogout, navigate };
};