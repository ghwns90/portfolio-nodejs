import { useEffect, useState } from 'react';
import { FaJava, FaNodeJs, FaReact, FaDocker } from 'react-icons/fa';
import profileImage from '../assets/profile.png';
import { BASE_URL } from '../constants';
import '../App.css'; 

function About(){

    const skills = {
        backend: [
            {name: "Java", category: "backend"},
            {name: "Node.js", category: "backend"},
            {name: "Spring Boot", category: "backend"},
            {name: "Python", category: "backend"},
        ],
        frontend: [
            {name: "React", category: "frontend"},
            {name: "JavaScript", category: "frontend"},
            {name: "HTML/CSS", category: "frontend"},
        ],
        devops: [
            {name: "Docekr", category: "devops"},
            {name: "AWS", category: "devops"},
            {name: "Git", category: "devops"},
        ]
    };

    const allSkills = [...skills.frontend, ...skills.backend, ...skills.devops];

    // 프로필 데이터를 담을 그릇
    const [profile, setProfile] = useState(null);

    // 화면 켜지면 데이터 가져오기
    useEffect(()=> {
        fetch(`${BASE_URL}/api/profile`)
            .then((res)=> res.json())
            .then((data) => {
                console.log('확인용 데이터 도착 : ', data); // 확인용 로그
                setProfile(data);
            })
            .catch((err) => console.error("프로필 가져오기 실패 : ",err));
    }, []);

    // 데이터가 아직 안왔으면 로딩중이라고 띄우기
    if(!profile) {
        return <div style={{ textAlign: 'center', padding: '50px', alignItems: 'center' }}>Loading my profile...</div>;
    }

    return(
        // id="about"은 나중에 메뉴 눌렀을 때 여기로 스크롤 이동하려고 달아두는 이름표
        <section id="about" className="section-spacer" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* 왼쪽 상단 보라색 조명 */}
            <div className="bg-blob blob-purple" style={{top: '-10%', left: '-10%' }}></div>
            {/* 오른쪽 하단 핑크색 조명 */}
            <div className="bg-blob blob-pink" style={{ bottom: '-10%', right: '-10%'}}></div>
            <div className="container">
                <div className="card about-card-layout fade-up-element" >
                    {/* 이미지 */}
                    <div className="profile-section fade-up-element delay-2">
                        <div className="profile-img-wrapper">
                            <img
                                src={profile.profile_image_url || profileImage}
                                alt={`${profile.name} 프로필`}
                                className="profile-img"
                            />
                        </div>
                    </div>
                
                    {/* 텍스트 */}
                    <div className="info-section">
                        <h1 className="about-title fade-up-element delay-2">
                            {profile.title.split('\n').map((line, i) => (
                                <span key={i}>
                                    {line}
                                    <br/>
                                </span>
                            ))}
                            <span className="text-highlight" style={{ fontSize: '1.5rem', marginTop: '10px', display: 'block'}}>
                                {profile.name}
                            </span>
                        </h1>

                        <div className="about-desc fade-up-element delay-3">
                            {profile.description.split('\n').map((line, index) => (
                                <p key={index} style={{marginBottom: '10px'}}>{line}</p>
                            ))}
                        </div>
                        {/* 기술 스택 */}
                        <div className="tech-stack-container fade-up-element delay-4">
                            <h3 style={{fontSize:'1.1rem', marginBottom:'15px', color:'#ccc'}}>Tech Stack</h3>
                            <div className="skills-wrapper">
                                {skills.frontend.map((skill, index) => (
                                    <span key={index} className={`skill-chip ${skill.category}`}>
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                            <div className="skills-wrapper">    
                                {skills.backend.map((skill, index) => (
                                    <span key={index} className={`skill-chip ${skill.category}`}>
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                            <div className="skills-wrapper">
                                {skills.devops.map((skill, index) => (
                                    <span key={index} className={`skill-chip ${skill.category}`}>
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;