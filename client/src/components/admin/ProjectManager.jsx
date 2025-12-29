import { useEffect, useState } from 'react';
import CreateProject from '../../CreateProject'; // 경로 주의! (../../)
import { BASE_URL } from '../../constants';

function ProjectManager(){

    const [projects, setProjects] = useState([]);

    useEffect(()=> {
        fetch(`${BASE_URL}/api/projects`)
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
        fetch(`${BASE_URL}/api/projects/${id}`, {
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
            <h2 className="section-title"> 프로젝트 관리</h2>
            {/* 글쓰기 폼 */}
            <CreateProject onProjectAdded={handleProjectAdded} />
            
            <div style={{ margin: '50px 0 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ color: '#ccc' }}>현재 등록된 프로젝트 ({projects.length})</h3>
                <div style={{ height: '1px', flex: 1, background: '#333', marginLeft: '20px' }}></div>
            </div>

            {/* 목록 */}
            <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {projects.map((project) => (
                    <div key={project.id} className="card" style={{position: 'relative'}}>
                        <img src={project.image_url} alt={project.title} className="card-img" style={{ height: '150px' }}/>
                        <div className="card-content">
                            <h4>{project.title}</h4>
                            <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '10px' }}>{project.description}</p>

                            <button
                                onClick={() => handleDelete(project.id)}
                                className="btn"
                                style={{
                                    position: 'absolute', top: '10px', right: '10px',
                                    background: 'rgba(255, 68, 68, 0.8)', padding: '5px 8px', fontSize: '0.8rem'
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