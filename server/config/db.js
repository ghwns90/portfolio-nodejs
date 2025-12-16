const { Pool } = require('pg');

const path = require('path');
require('dotenv').config(); // .env 파일의 내용을 불러온다
//require('dotenv').config({ path: path.join(__dirname, '../../.env')}); 

const pool = new Pool({
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    host : process.env.DB_HOST,
    port : process.env.DB_PORT,
    database : process.env.DB_NAME,
});

// 연결 이벤트 리스너 (잘 연결됐는지 확인용)
pool.on('connect', ()=> {
    console.log('✅ DB에 성공적으로 연결되었습니다! (PostgreSQL)');
});

pool.on('error', (err)=>{
    console.error('❌ DB 연결 중 에러 발생:', err);
});

// 다른 파일에서 이 pool을 가져다 쓸 수 있도록 내보내기
// query 함수를 래핑해서 내보내면 나중에 쓰기 편해요.
module.exports = {
    query : (text,params) => pool.query(text,params),
};