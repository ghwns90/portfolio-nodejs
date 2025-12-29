import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollAnimation = () => {

  const location = useLocation();
  
  useEffect(()=> {

    // 감시자 세팅
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if(entry.isIntersecting){
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          };
        });
    }, {threshold: 0.1, rootMargin: "0px 0px -50px 0px"});
   

    const observeNewElements = () => {
      // .fade-up-element 클래스가 있는데, 아직 감시안받는 (.observed 마크가 없는) 애들만 찾음
      const targets = document.querySelectorAll('.fade-up-element:not(.observed)');

      targets.forEach(target => {
        observer.observe(target);
        target.classList.add('observed');
      });
    };

    // 초기 실행
    observeNewElements();

    // CCTV 설치 (MutationObserver)
    // 화면에 뭔가 추가되거나 변하면 observeNewElements를 다시 실행해라
    const mutationObserver = new MutationObserver(() => {
      observeNewElements();
    })

    // body 전체를 감시(자식 요소 추가 감지)
    mutationObserver.observe(document.body, {childList: true, subtree: true});

    //첨소
    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };

  }, [location.pathname]);
};
    
