import { useState, useEffect } from 'react';
import { BASE_URL } from '../constants'; // 상수 경로 맞춰주세요

export const useAuthCheck = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect( () => {
        checkLoginStatus();
    }, [])

    const checkLoginStatus = async () => {
        const accessToken = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');

        if(!accessToken){
            setIsLoggedIn(false);
            setIsLoading(false);
            return;
        }

        //accessToken 유효성 검사 (verify API 호출)
        try {
            const res = await fetch(`${BASE_URL}/api/auth/verify`, {
                headers: {'Authorization': `Bearer ${accessToken}`}
            });

            if(res.ok){
                //토큰 살아있음
                setIsLoggedIn(true);
            }else{
                throw new Error('Access token expired');
            }
        }catch(err){
            await tryRefreshToken(refreshToken);
        }finally{
            setIsLoading(false);
        }
    };

    const tryRefreshToken = async (refreshToken) => {
        if(!refreshToken){
            handleLogout();
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/api/auth/refresh`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({refreshToken})
            });

            if(response.ok){
                const data = await response.json();
                // 새 토큰으로 갈아끼우기
                localStorage.setItem('token', data.accessToken);
                setIsLoggedIn(true);
                console.log("토큰이 갱신되었습니다🔄.");
            }else{
                handleLogout();
            }
        } catch (error) {
            handleLogout();
        }
    
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        setIsLoggedIn(false);
    }

    // 훅을 사용하는 곳에서 필요한 정보만 리턴!
    return { isLoggedIn, isLoading };

};