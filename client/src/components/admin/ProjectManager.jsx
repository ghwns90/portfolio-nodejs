import { useEffect, useState } from 'react';
import CreateProject from '../../CreateProject'; // 경로 주의! (../../)

function ProjectManager(){

    const [projects, setProjects] = useState([]);

    useEffect(()=> {
        fetch('http://localhost:3000/api/projects')
            .then((res) => res.json())
            .then((data) => setProjects(data))
            .catch((err) => console.error(err));
    }, []);

    const handleProjectAdded = (newProject) => {
        setProjects([newProject, ...projects]);
    };

    const handleDelete = (id) => {
        if(!window.confirm("정말 삭제하시겠습니까?")) return;

        const token = localStorage.getItem('token');

        // 백엔드에 삭제 요청 보내기
        fetch(`http://localhost:3000/api/projects/${id}`, {
            method : 'DELETE',
            headers: {
                'Authorization' : `Bearer ${token}`,
            }
        })
        .then((res) => {
            if(res.ok){
                alert('삭제되었습니다!');
                // 화면에서도 그녀석을 지워줘야함
                // filter : "방금 지운 id랑 다른 애들만 남겨라!"
                setProjects(projects.filter(project => project.id !== id));
            }else if(res.status === 401){
                alert("로그인이 필요합니다");
            }
        })
        .catch(err => console.error(err));
    };

    return (

        <div>
            <h3>📋 프로젝트 관리</h3>
            {/* 글쓰기 폼 */}
            <CreateProject onProjectAdded={handleProjectAdded} />
            
            <hr style={{ margin: '30px 0', border: '0', borderTop: '1px solid #eee' }} />

            {/* 목록 */}
            <div className="grid">
                {projects.map((project) => (
                    <div key={project.id} className="card">
                        <img src={project.image_url} alt={project.title} className="card-img" />
                        <div className="card-content">
                            <h3>{project.title}</h3>
                            <button
                                onClick={() => handleDelete(project.id)}
                                style={{
                                    backgroundColor: '#ff4444', 
                                    color: 'white', 
                                    border: 'none', 
                                    padding: '8px 12px', 
                                    borderRadius: '5px', 
                                    cursor: 'pointer',
                                    marginTop: '10px',
                                    width: '100%'
                                }}
                            >
                                🗑
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProjectManager;