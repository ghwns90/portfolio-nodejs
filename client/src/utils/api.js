import { BASE_URL } from '../constants';

// 인증이 필요한 요청을 보낼 때 쓰는 함수
export const authFetch = async (url, options = {}) => {
    let accessToken = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    // 헤더에 토큰 실어서 요청
    options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    };

    let response = await fetch(`${BASE_URL}${url}`, options);

    // 401 에러가 뜬다면
    if(response.status === 401 && refreshToken){
        console.log("토큰 만료됨 재발급 시도 중..");

        //토큰 갱신 요청
        const refreshRes = await fetch(`${BASE_URL}/api/auth/refresh`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ refreshToken }),
        });

        if(refreshRes.ok){
            const data = await refreshRes.json();

            localStorage.setItem('token', data.accessToken);
            accessToken = data.accessToken;

            // 실패했던 원래 요청 다시 시도 (새 토큰으로)
            options.headers['Authorization'] = `Bearer ${accessToken}`;
            response = await fetch(`${BASE_URL}${url}`, options);
        }else {
            //리프레시 토큰도 만료됨 -> 강제 로그아웃
            localStorage.clear();
            window.location.href = '/login';
            return;
        }
    }

    return response;
}