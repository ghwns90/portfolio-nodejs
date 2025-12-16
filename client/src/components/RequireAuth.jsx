import React from 'react';
import { Navigate } from 'react-router-dom';

// 이 컴포넌트는 자식(children)을 감싸서 보호해줍니다.
function RequireAuth({ children }){
    const token = localStorage.getItem('token');

    // 토큰이 없다? 로그인 페이지로
    // replace: 뒤로가기 눌러도 다시 못 오게 기록을 덮어씌움
    if(!token){
        alert('관리자 권한이 필요합니다.');
        return <Navigate to="/login" relpace />;
    }
    // 토큰이 있으면 자식(Admin페이지)을 보여줌 
    return children;
}

export default RequireAuth;