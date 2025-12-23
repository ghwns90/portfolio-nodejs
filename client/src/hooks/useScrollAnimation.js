import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollAnimation = () => {

  const location = useLocation();
  
  useEffect(()=> {

    let animationFrameId;
    let observer;

    // 감시자 세팅
    const initObserver = () => {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if(entry.isIntersecting){
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          };
        });
      }, {threshold: 0.1});
    };
    // 요소를 찾을때 까지 반복해서 확인하는 함수
    const checkElements = ()=> {
      const targets = document.querySelectorAll('.fade-up-element');

      // 요소 찾았다
      if(targets.length> 0){
        if(!observer) initObserver();
        targets.forEach(target => observer.observe(target));
        return; // 임무완료 후 반복 종료
      }

      // 아직 안떴으면 다음프레임에 다시 확인
      animationFrameId = requestAnimationFrame(checkElements);
    };

    checkElements();

    //첨소
    return () => {
      if(animationFrameId) cancelAnimationFrame(animationFrameId);
      if(observer) observer.disconnect();
    };

  }, [location.pathname]);
};
    
