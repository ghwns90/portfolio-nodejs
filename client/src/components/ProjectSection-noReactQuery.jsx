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
              const mainProjectId = 42; 

              const sortedData = [...data].sort((a, b) => {

                  const idA = Number(a.id);
                  const idB = Number(b.id);
                  const target = Number(mainProjectId);
                  // a가 메인이면 앞으로(-1), b가 메인이면 뒤로(1)
                  if (idA === target) return -1;
                  if (idB === target) return 1;
                  // 나머지는 최신순(ID 큰게 위로) 또는 등록순 정렬
                  return idB - idA;
              });

              console.log('정렬된 데이터:', sortedData);
              setProjects(sortedData); // 그릇(state)에 담기! -> 화면이 자동으로 바뀜
        })
        .catch((err) => console.error('에러 발생 : ', err));
    }, []);

    return (
        <section id="projects" className="section-spacer">
          <div className="container">
            <h2 className="section-title text-left fade-up-element">
               Featured<span className="text-highlight"> Projects</span>
            </h2>

            <p className="text-center fade-up-element delay-1" style={{ color: '#aaa', marginBottom: '40px' }}>
            
            </p>

            <div className="bento-grid">
              {projects.map((project, index) => {
                // 🍱 벤토 그리드 로직: 
                // 첫 번째(index 0) 프로젝트는 2칸x2칸 차지하게 (대장 프로젝트)
                // 네 번째(index 3) 프로젝트는 가로로 2칸 차지하게 (와이드 프로젝트)
                let sizeClass = "";
                if(index === 0) sizeClass= "col-span-2 row-span-2";
                else if(index === 3) sizeClass = "col-span-2";
                
                return (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    className={sizeClass}
                  />
                );
            })}
            </div>
          </div>
        </section>
    );
}

export default ProjectSection;