import { useState, useRef } from 'react';
import ProjectCard from './components/ProjectCard';
import { FaPlus, FaImage } from 'react-icons/fa';
import { BASE_URL } from './constants';
// props: 부모(App.jsx)가 "야, 글 다 쓰면 이 함수 실행해" 하고 넘겨준 심부름 함수(onProjectAdded)
function CreateProject({ onProjectAdded }){

    // 사용자 입력을 저장할 변수들
    const [formData, setFormData] = useState({
        title : '',
        description : '',
        tech_stack : '',
        github_url : '',
        demo_url : '',
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImg, setPreviewImg] = useState(null);
    const fileInputRef = useRef(null);

    // 입력창에 글자를 칠 때마다 변수(State)에 업데이트하는 함수
    // 이게 스프링 때랑 가장 다른 점 (양방향 바인딩)
    const handleChange = (e) => {
        const {name, value} = e.target; // 방금 입력한 칸의 이름(name)과 값(value)
        setFormData({
            ...formData, // 기존에 입력했던건 유지하고 (... 스프레드 문법)
            [name] : value // 입력한 것만 덮어씌운다
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file){
            setSelectedFile(file);
            setPreviewImg(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let finalImageUrl = '';

        try{
            // 이미지 업로드
            if(selectedFile){

                const imgFormData = new FormData();

                imgFormData.append('file', selectedFile);
                
                const uploadRes = await fetch(`${BASE_URL}/api/upload`, {method: 'POST', body: imgFormData});
                const uploadData = await uploadRes.json();

                finalImageUrl = uploadData.url;
            }

            const token = localStorage.getItem('token');
            const projectData = {...formData, image_url: finalImageUrl};

            const res = await fetch(`${BASE_URL}/api/projects`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(projectData)
            });

            if(res.ok){
                const newProject = await res.json();
                alert('프로젝트 추가 완료');
                onProjectAdded(newProject);
                setFormData({title: '', description: '', tech_stack: '', github_url: '', demo_url: ''});
                setPreviewImg('');
                setSelectedFile(null);
            }
        }catch(err){
            console.error(err);
        }
    };

    return (

        <div className="card admin-create-card" style={{ display: 'flex', gap: '30px', padding: '30px', background: 'rgba(255,255,255,0.02)' }}>
            {/* 왼쪽: 등록 인풋 섹션 */}
            <div className="form-section" style={{ flex: 1.2 }}>
                <h4 style={{ marginBottom: '20px', display:'flex', alignItems: 'center', gap: '10px' }}>
                    <FaPlus color="#a855f7" /> 프로젝트 추가
                </h4>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <input 
                        type="text" name="title" placeholder="제목" 
                        className="input-field" value={formData.title} onChange={handleChange} 
                        required
                    />
                    <textarea 
                        name="description" placeholder="설명" 
                        className="textarea-field" rows="3" value={formData.description} onChange={handleChange} 
                        required
                    />
                    <input
                        type="text" name="tech_stack" placeholder="사용 기술"
                        className="input-field" value={formData.tech_stack} onChange={handleChange}
                    />

                    <div style={{ display: 'flex', gap: '10px'}}>
                        <input 
                            type="text" name="github_url" placeholder="Github"
                            className="input-field" value={formData.github_url || `https://`} onChange={handleChange}
                            style={{flex: 1}}
                        />
                        <input 
                            type="text" name="demo_url" placeholder="Demo URL (배포주소)" 
                            className="input-field" style={{ flex: 1 }} value={formData.demo_url} onChange={handleChange} 
                        />
                    </div>
                    
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center'}}>
                        <button 
                            type="button" className="btn btn-outline" style={{flex: 1}}
                            onClick={()=> fileInputRef.current.click()}>
                                이미지 선택
                        </button>
                        <input type="file" ref={fileInputRef} style={{display: 'none'}} onChange={handleFileChange} accept="image/*"/>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ marginTop: '10px', padding: '15px'}}>프로젝트 등록</button>

                </form>
            </div>

            {/* 오른쪽: 실시간 프리뷰 섹션 */}
            <div className="preview-section" style={{flex: 0.8, display: 'flex', flexDirection: 'column'}}>
                <h4 style={{marginBottom: '20px', color: '#666', textAlign: 'center'}}>미리보기</h4>
                {/* 프리뷰 카드 */}
                <div style={{ width: '100%', maxWidth: '350px', margin: '0 auto'}}>
                    <ProjectCard 
                        project={{
                            ...formData,
                            image_url: previewImg,
                        }}
                        className="preview-mode"
                        style={{ minHeight: '350px', border: '1px solid #444' }}
                        animated={false}
                    />
                </div>
                <p style={{ marginTop: '15px', fontSize: '0.8rem', color: '#555', textAlign: 'center' }}>
                    * 사용자 화면에서 보여지는 실제 크기와 디자인입니다.
                </p>
            </div>
        </div>

        
    );
}

export default CreateProject;