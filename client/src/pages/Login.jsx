import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {BASE_URL} from '../constants';

function Login(){
    const [credentials, setCredentials] = useState({username: '', password: ''});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCredentials({...credentials, [name]: value});
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(credentials)
        })
        .then(res => res.json())
        .then(data => {
            if(data.token){
                localStorage.setItem('token', data.token);

                alert('로그인 되었습니다. 관리자 페이지로 이동합니다');
                navigate('/admin');
            }else{
                alert(data.message || '로그인 실패');
            }
        })
        .catch(err => console.error(err));
            
        
    };

    return (
        <div className="container flex-center" style={{ minHeight: '80vh' }}>
            <form onSubmit={handleSubmit} className="card" style={{ padding: '40px', width: '400px' }}>
                <h2 className="text-center section-title">🔒 관리자 로그인</h2>
                
                <div className="input-group">
                <input 
                    type="text" name="username" placeholder="아이디" 
                    className="input-field"
                    onChange={handleChange}
                />
                </div>
                
                <div className="input-group">
                <input 
                    type="password" name="password" placeholder="비밀번호" 
                    className="input-field"
                    onChange={handleChange}
                />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                로그인
                </button>
            </form>
        </div>
    );

}

export default Login;