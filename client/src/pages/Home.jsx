import React from 'react';
import '../App.css';
import About from '../components/About';
import Guestbook from '../components/Guestbook';
import ProjectSection from '../components/ProjectSection';
import Navbar from '../components/Navbar';
import Contact from '../components/Contact';

function Home() {

  return (
    <>
      <div className="container"> 
        {/* 소개 섹션 */}     
        <About/>
        {/* 프로젝트 섹션 */}
        <ProjectSection />
        <div className="divider"></div>

        {/* 방명록 섹션 ID: guestbook */}        
        <Guestbook />
        
        {/* Contact 섹션 */}
        <Contact />
      </div>
    </>
    
  );
}

export default Home;