import React from 'react';
import {useState, useEffect, useRef} from 'react';
import { BASE_URL } from '../../constants';

function ProfileEditor(){
    const [profile, setProfile] = useState({
        name: '', title: '', description: '', profile_image_url: '', github_url: ''
    });

    // 파일 처리를 위한 state 추가
    const [selectedFile, setSelectedFile] = useState(null); // 실제 파일 객체
    const [previewUrl, setPreviewUrl] = useState(''); // 미리보기용 임시 URL
    // file input을 숨기고 버튼으로 제어하기 위한 ref
    const fileInputRef = useRef(null);

    //데이터 불러오기
    useEffect(()=>{
        fetch(`${BASE_URL}/api/profile`)
            .then(res => res.json())
            .then(data => setProfile(data))
            .catch(err => console.error(err));
    }, []);

    // 입력값 변경 핸들러
    const handleProfileChange = (e) => {
        const {name, value} = e.target;
        setProfile({...profile, [name]: value});
    };

    // 파일 선택시 실행 되는 함수(미리보기 생성)
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            setSelectedFile(file);
            // 브라우저 메모리에 있는 파일을 볼 수 있는 임시 URL 생성(미리보기용)
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
        }
    };

    // 이미지 업로드 함수(서버로 파일을 보내고 URL을 받아옴)
    const uploadImage = async () => {

        if(!selectedFile) return null;

        const formData = new FormData();
        formData.append('file', selectedFile); // 백엔드에서 받을 이름이 'file'

        const token = localStorage.getItem('token');

        try {
            const res = await fetch(`${BASE_URL}/api/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            });

            if(!res.ok) throw new Error('이미지 업로드 실패');

            const data = await res.json();
            return data.url; // 서버가 돌려준 진짜 이미지 주소 (예: /images/abc.jpg)

        } catch (error) {
            console.error(err);
            alert('이미지 업로드 중 오류 발생');
            return null;
        }
    };

    // 저장 버튼 클릭시 (이미지 업로드 -> 프로필 저장 순차 실행 )
    const handleProfileUpdate = async () => {
        let finalImageUrl = profile.profile_image_url;

        // 사용자가 새이미지를 먼저 골랐다면 먼저 업로드
        if(selectedFile){
            const uploadUrl = await uploadImage();
            if(uploadUrl){
                finalImageUrl = uploadUrl;
            }else{
                return;
            }
        }

        // 프로필 정보 업데이트
        const updatedProfile = {...profile, profile_image_url: finalImageUrl};
        const token = localStorage.getItem('token');

        fetch(`${BASE_URL}/api/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedProfile)
        })
        .then(res => {
            if(res.ok){
                alert('프로필 수정 완료');
                // 미리보기 메모리 해제
                if(previewUrl) URL.revokeObjectURL(previewUrl);
                window.location.reload();
            }else{
                alert('수정 실패');
            }
        });
    };    

    return (
        <div>
            <h2 className="section-title">프로필 관리</h2>
            <div className="card">
            
            <div className="form-row" style={{ display:'flex', gap:'15px', marginBottom:'20px'}}>
                <div style={{flex: 1}}>
                    <label style={{ display: 'block', marginBottom: '10px', color: '#ccc'}}>이름</label>
                    <input 
                        type="text" name="name" value={profile.name} onChange={handleProfileChange} 
                        className="input-field" 
                    />
                </div>
                <div style={{flex: 1}}>
                    <label style={{ display: 'block', marginBottom: '10px', color: '#ccc'}}>한 줄 소개</label>
                    <input 
                        type="text" name="title" value={profile.title} onChange={handleProfileChange} 
                        className="input-field" 
                    />
                </div>
            </div>    
                <div className="form-group" style={{ marginBottom: '20px' }}>
                    <label style={{ display:'block', marginBottom:'10px', color:'#ccc' }}>자기소개</label>
                    <textarea rows="5" className="textarea-field" value={profile.description} name="description" 
                    onChange={handleProfileChange} />
                </div>                
                <div className="form-group" style={{ marginBottom: '20px'}}>
                    <label style={{ display: 'block', marginBottom: '10px', color: '#ccc'}}>이미지 업로드</label>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        {/* 미리보기 원형 */}
                        <div style={{
                            width: '100px', height: '100px', 
                            borderRadius: '50%', overflow: 'hidden',
                            border: '2px solid #a855f7',
                            background: '#000'
                        }}>
                            <img 
                                src={previewUrl || profile.profile_image_url } 
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                            />
                        </div>
                        {/* 파일 선택 버튼 */}
                        <div>
                            <input 
                                type="file" 
                                accept="image/*" 
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                style={{ display: 'none' }} // 못생긴 기본 input은 숨김
                            />
                            <button 
                                type="button" 
                                className="btn btn-outline"
                                onClick={() => fileInputRef.current.click()} // 버튼 누르면 input 클릭 효과
                            >
                                이미지 변경
                            </button>
                            <p style={{ color: '#666', fontSize: '0.8rem', marginTop: '5px' }}>
                                권장 사이즈: 500x500px (JPG, PNG)
                            </p>
                        </div>
                    </div>
                </div>
                <div className="form-group" style={{ marginBottom: '20px'}}>
                    <label style={{ display: 'block', marginBottom: '10px', color: '#ccc'}}>깃허브 URL</label>
                    <input 
                        type="text" name="github_url" value={profile.github_url || ''} onChange={handleProfileChange} 
                        className="input-field" 
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button className="btn btn-primary" onClick={handleProfileUpdate}>
                        저장
                    </button>
                </div>
            </div>
        </div>
        
    );

}

export default ProfileEditor;