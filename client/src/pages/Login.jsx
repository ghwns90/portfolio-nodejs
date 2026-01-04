import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {BASE_URL} from '../constants';
import { FaLock, FaUserShield } from 'react-icons/fa';
import { useNavLogic } from '../hooks/useNavLogic';

function Login(){
    const {navigate} = useNavLogic();
    const [credentials, setCredentials] = useState({username: '', password: ''});
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCredentials({...credentials, [name]: value});
    };
    
    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        try {
            fetch(`${BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(credentials)
            })
            .then(res => res.json())
            .then(data => {
                if(data.accessToken){
                    localStorage.setItem('token', data.accessToken);
                    localStorage.setItem('refreshToken', data.refreshToken);

                    alert('로그인 되었습니다. 관리자 페이지로 이동합니다');
                    navigate('/admin');
                }else{
                    alert(data.message || '로그인 실패');
                }
            })
            .catch(err => console.error(err));
        } catch (error) {
            console.error(error);
        }

        
            
        
    };

    return (

        <div className="login-page-wrapper">
            {/* 배경에 은은한 조명 하나 깔아주기 */}
            <div className="bg-blob blob-purple" style={{ width: '600px', height: '600px', opacity: 0.2 }}></div>

            <form className="login-card" onSubmit={handleLogin}>
                <div className="login-icon-area">
                    <FaUserShield />
                </div>

                <h2 className="login-title">Login</h2>

                <div className="floating-input-group">
                    <input 
                        type="text"
                        name="username"
                        className="floating-input"
                        placeholder=" "
                        value={credentials.username}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                    />
                    <label className="floating-label">아이디</label>
                </div>

                <div className="floating-input-group">
                    <input 
                        type="password"
                        name="password"
                        className="floating-input"
                        placeholder=" "
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                    <label className="floating-label">비밀번호</label>
                </div>

                {/* 에러 메시지 표시 */}
                {error && (
                    <div style={{ color: '#ff4d4d', fontSize: '0.9rem', marginBottom: '20px', textAlign:'center' }}>
                        ⚠️ {error}
                    </div>
                )}

                <button type="submit" className="btn-login">
                    로그인
                </button>

                {/* (선택) 홈으로 돌아가기 링크 */}
                <div 
                    onClick={() => navigate('/')} 
                    style={{ marginTop: '20px', color: '#666', cursor: 'pointer', fontSize: '0.9rem', textDecoration: 'underline' }}
                >
                    홈으로 돌아가기
                </div>
            </form>
        </div>
        
    );

}

export default Login;