import React, { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import { BASE_URL } from '../constants'; // 상수 파일

function ProjectSection(){
    const [projects, setProjects] = useState([]);

    // 화면이 켜지면 딱 한 번 실행되는 함수
    useEffect(()=> {
        // 백엔드에 데이터 달라고 요청 (fetch)
        fetch(`${BASE_URL}/api/projects`)
        .then((res) => res.json())
        .then((data) => {
            console.log('데이터 도착 : ',  data);
            setProjects(data); // 그릇(state)에 담기! -> 화면이 자동으로 바뀜
        })
        .catch((err) => console.error('에러 발생 : ', err));
    }, []);

    return (
        <section id="projects" className="section-spacer">
          <h2 className="section-title text-left">📂 My Projects</h2>

          <div className="grid">
            {projects.map((project) => (
              // 긴 코드 대신 <ProjectCard /> 한줄로 끝
              // ** key 는 리액트가 목록 관리할 때 필요해서 넣어주고,
              // project={project}로 데이터를 통째로 넘겨준다. props?
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
    );
}

export default ProjectSection;