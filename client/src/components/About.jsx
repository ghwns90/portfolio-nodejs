import { useEffect, useState } from 'react';
import { FaJava, FaNodeJs, FaReact, FaDocker } from 'react-icons/fa';
import { SiSpringboot, SiPostgresql } from 'react-icons/si';
import '../App.css'; 

function About(){
    // 프로필 데이터를 담을 그릇
    const [profile, setProfile] = useState(null);

    // 화면 켜지면 데이터 가져오기
    useEffect(()=> {
        fetch('http://localhost:3000/api/profile')
            .then((res)=> res.json())
            .then((data) => {
                console.log('확인용 데이터 도착 : ', data); // 확인용 로그
                setProfile(data);
            })
            .catch((err) => console.error("프로필 가져오기 실패 : ",err));
    }, []);

    // 데이터가 아직 안왔으면 로딩중이라고 띄우기
    if(!profile) {
        return <div style={{ textAlign: 'center', padding: '50px' }}>Loading my profile...</div>;
    }

    return(
        // id="about"은 나중에 메뉴 눌렀을 때 여기로 스크롤 이동하려고 달아두는 이름표
        <section id="about" className="section-spacer">
            <div className="about-content">
                {/*  프로필 이미지 (임시 이미지) */}
                <div className="profile-img-wrapper">
                    <img
                        src={profile.profile_image_url || "https://via.placeholder.com/150"}
                        alt="프로필"
                        className="profile-img"
                    />
                </div>

                {/* 2. 자기소개 텍스트 */}
                <h1 className="about-title">
                    <span className="text-highlight">{profile.title}</span> {profile.name} 입니다.
                </h1>
               
                <p className="about-desc">
                    {profile.description.split('\n').map((line, index) => (
                        <span key={index}>
                            {line}
                            <br />
                        </span>
                    ))}
                </p>
                
                {/* 기술 아이콘 (나중에 이것도 컴포넌트로 뺄 수 있다) */}
                <div className="tech-icons">
                    <span className="icon-box"><FaJava size={40} color="#007396"/><p>Java</p></span>
                    <span className="icon-box"><FaNodeJs size={40} color="#007396"/><p>NodeJs</p></span>
                    <span className="icon-box"><FaReact size={40} color="#007396"/><p>React</p></span>
                    <span className="icon-box"><FaDocker size={40} color="#007396"/><p>Docker</p></span>
                </div>
            </div>
        </section>
    );
}

export default About;