import { useState } from 'react';
import { BASE_URL } from './constants';
// props: 부모(App.jsx)가 "야, 글 다 쓰면 이 함수 실행해" 하고 넘겨준 심부름 함수(onProjectAdded)
function CreateProject({ onProjectAdded }){

    // 사용자 입력을 저장할 변수들
    const [formData, setFormData] = useState({
        title : '',
        description : '',
        image_url : '',
        tech_stack : '',
        github_url : '',
        demo_url : '',
    });

    // 입력창에 글자를 칠 때마다 변수(State)에 업데이트하는 함수
    // 이게 스프링 때랑 가장 다른 점이에요! (양방향 바인딩)
    const handleChange = (e) => {
        const {name, value} = e.target; // 방금 입력한 칸의 이름(name)과 값(value)
        setFormData({
            ...formData, // 기존에 입력했던건 유지하고 (... 스프레드 문법)
            [name] : value // 입력한 것만 덮어씌운다
        });
    };

    // '저장' 버튼을 눌렀을때 실행되는 함수
    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        fetch(`${BASE_URL}/api/projects`, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`,
            },
            body : JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            alert('성공적으로 추가했어요');
            onProjectAdded(data); // 부모한테 "나 다 했어!" 알림
            //입력창 비우기
            setFormData({
                title : '', description : '', image_url : '', tech_stack : ''
            });
        })
        .catch(err => alert('에러 발생'));
    };

    return (
        <div style={{ border : '2px dashed #ccc', padding : '20px', marginBottom : '30px', borderRadius: '10px'}}>
            <h3>➕ 프로젝트 추가하기</h3>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom : '10x' }}>
                    <input
                        type="text"
                        name="title"
                        placeholder='프로젝트 제목'
                        value={formData.title}
                        onChange={handleChange} // 글자를 칠때마다 handleChange 실행
                        style={{ width : '100%', padding : '8px'}}
                    />
                </div>
                <div style={{marginBottom : '10px'}}>
                    <input
                        type="text" 
                        name="description" 
                        placeholder="설명" 
                        value={formData.description} 
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input 
                        type="text" 
                        name="image_url" 
                        placeholder="이미지 URL (예: https://...)" 
                        value={formData.image_url} 
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input 
                        type="text" 
                        name="github_url" 
                        placeholder="GitHub 주소 (https://github.com/...)" 
                        value={formData.github_url} 
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input 
                        type="text" 
                        name="demo_url" 
                        placeholder="배포 사이트 주소 (선택사항)" 
                        value={formData.demo_url} 
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>                
                <div style={{ marginBottom: '10px' }}>
                    <input 
                        type="text" 
                        name="tech_stack" 
                        placeholder="사용 기술 (예: Node.js, React)" 
                        value={formData.tech_stack} 
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <button type="submit" style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    저장하기
                </button>
            </form>
        </div>
    );
}

export default CreateProject;