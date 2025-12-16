import React from 'react';
import {useState, useEffect} from 'react';
import { BASE_URL } from '../../constants';

function ProfileEditor(){
    const [profile, setProfile] = useState({
        name: '', title: '', description: '', profile_image_url: '', github_url: ''
    });

    const BASE_URL = 'http://localhost:3000';
    //데이터 불러오기
    useEffect(()=>{
        fetch(`${BASE_URL}/api/profile`)
            .then(res => res.json())
            .then(data => setProfile(data))
            .catch(err => console.error(err));
    }, []);

    //입력값 변경 핸들러
    const handleProfileChange = (e) => {
        const {name, value} = e.target;
        setProfile({...profile, [name]: value});
    };

    //수정 요청 핸들러
    const handleProfileUpdate = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        fetch(`${BASE_URL}/api/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(profile)
        })
        .then(res => {
            if(res.ok) {alert('프로필이 수정되었습니다. 😎')}
            else if(res.status === 401 || res.status === 403){
                alert('로그인이 만료되었거나 권한이 없습니다');
            }else{
                alert('수정 실패');
            }
        });
    };

    return (
        <div style={{ padding: '20px', background: 'white', borderRadius: '10px', border: '1px solid #ddd' }}>
            <h3> Profile 수정 </h3>
            <form onSubmit={handleProfileUpdate}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                    <input 
                        type="text" name="name" placeholder="이름" 
                        value={profile.name} onChange={handleProfileChange} 
                        style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} 
                    />
                    <input 
                        type="text" name="title" placeholder="한 줄 소개" 
                        value={profile.title} onChange={handleProfileChange} 
                        style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} 
                    />
                </div>
                <textarea 
                    name="description" placeholder="긴 자기소개" rows="4"
                    value={profile.description} onChange={handleProfileChange} 
                    style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }} 
                />
                <input 
                    type="text" name="profile_image_url" placeholder="프로필 이미지 URL" 
                    value={profile.profile_image_url} onChange={handleProfileChange} 
                    style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }} 
                />
                <input 
                    type="text" name="github_url" placeholder="깃허브 URL" 
                    value={profile.github_url || ''} onChange={handleProfileChange} 
                    style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }} 
                />
                <button type="submit" style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                    저장
                </button>
            </form>
        </div>
        
    );

}

export default ProfileEditor;