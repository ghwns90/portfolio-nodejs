import React from 'react';
import { useNavLogic } from '../hooks/useNavLogic';
import { FaBars } from 'react-icons/fa'; // 햄버거 메뉴 아이콘 등

const MobileNavbar = ({ onOpen }) => {
  const { navigate } = useNavLogic(); // 여기선 간단하게 이동만 필요하다면

  return (
    <header className="navbar-mobile">
      <button
        onClick={onOpen} style={{background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer', display: 'flex'}}
      >
        <FaBars/>
      </button>
      <div 
        className="logo-area" 
        style={{marginBottom: 0, fontSize: '1.2rem', cursor: 'pointer'}}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        HoJunior
      </div>
      
      {/* 모바일은 공간이 좁아서 보통 햄버거 메뉴를 넣거나 심플하게 처리 */}
      <div style={{ display: 'flex', gap: '15px' }}>
         <button onClick={() => navigate('/login')} className="btn-primary" style={{padding: '5px 15px', fontSize:'0.8rem'}}>
            Login
         </button>
      </div>
    </header>
  );
};

export default MobileNavbar;