
# portfolio-nodejs
<h2>
📘 Interactive Full-Stack Portfolio (개인 포트폴리오)
</h2>
<strong>
"기획부터 배포까지, React와 Node.js로 직접 구축한 소통형 포트폴리오 웹사이트"
</strong><br>
단순한 정보 전달을 넘어, 방문자와의 상호작용(방명록, 메일 답장)과 관리자 기능을 포함한 풀스택 프로젝트입니다.
<h3>🛠 1. 기술 스택 (Tech Stack)구분스택FrontendBackendDatabaseInfra & Tools</h3>

### Frontend
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/> <img src="https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white"/> <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/>

### Backend
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/> <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white"/> <img src="https://img.shields.io/badge/Nodemailer-007ACC?style=flat-square&logo=gmail&logoColor=white"/>

### Database & Security
<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=PostgreSQL&logoColor=white"/> <img src="https://img.shields.io/badge/JWT-000000?style=flat-square&logo=JSON%20web%20tokens&logoColor=white"/>

### Tools
<img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=Git&logoColor=white"/> <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"/> <img src="https://img.shields.io/badge/DBeaver-382923?style=flat-square&logo=dbeaver&logoColor=white"/>

### 1. Frontend (사용자 인터페이스)
React: 컴포넌트 기반 UI 구축 (Hooks: useState, useEffect, useRef 적극 활용)

React Router: SPA(Single Page Application) 구현 및 페이지 라우팅

CSS3: Flexbox/Grid를 활용한 반응형 레이아웃 설계

React Icons: 아이콘 자산 관리

### 2. Backend (서버 & API)
Node.js: 자바스크립트 런타임 환경

Express.js: RESTful API 서버 구축 및 라우팅 처리

Nodemailer: SMTP 기반 이메일 전송 시스템 (문의하기, 답장 기능)

Dotenv: 환경 변수(.env) 관리로 보안성 강화

### 3. Database & Security (데이터 & 보안)
PostgreSQL: 관계형 데이터베이스(RDBMS) 구축

node-postgres (pg): SQL 쿼리를 직접 작성하여 최적화된 DB 연동

JWT (JSON Web Token): 관리자 인증 및 세션 관리 (Stateless 방식)

Bcrypt.js: 비밀번호 단방향 암호화 저장

### 4. Tools & DevOps (협업 및 도구)
Git / GitHub: 형상 관리 및 버전 제어

DBeaver: 데이터베이스 GUI 관리 도구

Postman: API 엔드포인트 테스트 (개발 중 사용)

npm: 패키지 의존성 관리

<hr style="border:3px solid #aaa">

<h3>✨ 2. 주요 기능 (Key Features)</h3>

<ul><strong>🖥️ Frontend (UI/UX)</strong>

  <li>Scroll Spy Navigation: Intersection Observer 로직을 직접 구현(useRef, Debounce 활용)하여, 스크롤 위치에 따라 네비게이션 메뉴가 자동으로 활성화됨.</li>
  
  <li>반응형 레이아웃: CSS Flexbox/Grid를 활용하여 모바일 및 데스크탑 환경 최적화.</li>
  
  <li>Interactive UI: 부드러운 스크롤 이동(Smooth Scroll) 및 직관적인 인터랙션 제공.</li>
</ul>

<ul><strong>⚙️ Backend (Server)</strong>

  <li>Layered Architecture: Controller - Service - Model 3계층 구조로 분리하여 유지보수성 및 코드 재사용성 향상.</li>
  
  <li>RESTful API: 자원 중심의 체계적인 API 설계 및 구현.</li>
  
  <li>CRM 시스템 (Contact): Nodemailer와 Gmail SMTP를 연동하여 방문자 문의 시 관리자에게 실시간 알림 메일 전송.</li>
  
  <li>문의 내용을 DB에 저장하고, 관리자 대시보드에서 이메일 답장(Reply) 기능 구현.</li>
</ul>

<hr style="border:3px solid #aaa">

<h3>💾 Database (Data Management)</h3>
<li>효율적인 페이징 (Pagination): 방명록 데이터가 많아질 것을 대비해 LIMIT / OFFSET 기반의 서버 사이드 페이징 구현.</li>

<li>계층형 댓글 시스템: Comments(부모)와 Replies(자식) 테이블을 1:N 관계로 정규화하고, ON DELETE CASCADE를 적용하여 데이터 무결성 보장.</li>

<li>N+1 문제 해결: 방명록 조회 시 댓글과 답글을 각각 조회하는 비효율을 막기 위해 WHERE IN 쿼리와 메모리 매핑 방식을 사용하여 성능 최적화.</li>

<h3>🗂 3. 데이터베이스 설계 (ERD)</h3>
<table>
  <tr>
    <th> 테이블명 </th>
    <th> 역할 </th>
    <th> 주요 컬럼 </th>
    <th> 비고 </th>
  </tr>
  <tr>
    <td> Users </td>
    <td>관리자 계정</td>
    <td>id, username, password (BCrypt 암호화)</td>
    <td>JWT 인증 기반</td>
  </tr>
  <tr>
    <td>Projects</td>
    <td>포트폴리오 프로젝트</td>
    <td>id, title, desc, tech_stack, img_url</td>
    <td>관리자 관리</td>
  </tr>
  <tr>
    <td>Comments</td>
    <td>방명록(게시글)</td>
    <td>id, username, password, content</td>
    <td>페이징 적용</td>
  </tr>
  <tr>
    <td>Replies</td>
    <td>방명록 답글</td>
    <td>id, comment_id(FK), content, username</td>
    <td>1:N 관계</td>
  </tr>
  <tr>
    <td>Messages</td>
    <td>문의 메시지함</td>
    <td>id, email, subject, message, is_replied</td>
    <td>관리자 수신함</td>
  </tr>
</table>

<hr style="border:3px solid #aaa">

<h3>📡 4. API 명세서 (API Specification)</h3>
<h4> 🔐 인증 (Auth) </h4>
<table>
  <tr>
    <th> Method </th>
    <th>Endpoint</th>
    <th>설명</th>
    <th>Auth</th>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/auth/login</td>
    <td>관리자 로그인 (JWT 발급)</td>
    <td>❌</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/auth/verify</td>
    <td>토큰 유효성 검증</td>
    <td>✅</td>
  </tr>
</table>

<h4> 💬 방명록 (Guestbook & Replies) </h4>
<table>
  <tr>
    <th> Method </th>
    <th>Endpoint</th>
    <th>설명</th>
    <th>Auth</th>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/comments</td>
    <td>방명록 목록 조회 (페이징, 답글 포함)</td>
    <td>❌</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/comments</td>
    <td>방명록 작성</td>
    <td>❌</td>
  </tr>
  <tr>
    <td>DELETE</td>
    <td>/api/comments/:id</td>
    <td>방명록 삭제 (작성자 비밀번호 검증)</td>
    <td>❌</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/comments/:id/replies</td>
    <td>방명록 답글 작성 (관리자 전용)</td>
    <td>✅</td>
  </tr>
</table>

<h4> 📧 문의 및 메시지 (Contact & CRM) </h4>
<table>
  <tr>
    <th> Method </th>
    <th>Endpoint</th>
    <th>설명</th>
    <th>Auth</th>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/contact</td>
    <td>수신 메시지 목록 조회</td>
    <td>✅</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/contact</td>
    <td>문의 메일 발송 및 DB 저장</td>
    <td>❌</td>
  </tr>
  <tr>
    <td>DELETE</td>
    <td>/api/contact/:id</td>
    <td>메시지 삭제</td>
    <td>✅</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/contact/:id/reply</td>
    <td>메시지 답장 발송 (이메일 전송)</td>
    <td>✅</td>
  </tr>
</table>

<hr style="border:3px solid #aaa">

<h3>🔥 5. 트러블 슈팅 (Trouble Shooting)</h3>

Q1. 스크롤 이동 시 네비게이션 '깜빡임' 현상
문제: 메뉴 클릭으로 스크롤이 이동하는 동안 scroll 이벤트가 연속 발생하여, 중간에 있는 섹션들이 활성화되었다가 꺼지는 현상 발생.

해결: useRef를 사용해 isNavigating 플래그를 생성. 클릭 시 true로 설정하여 자동 감지를 일시 중지하고, Debounce (setTimeout) 기법을 도입하여 스크롤이 완전히 멈춘 후 다시 감지를 시작하도록 로직 개선.

Q2. 대량 댓글 조회 시 N+1 문제
문제: 방명록 목록(부모)을 불러온 후, 각 글마다 답글(자식)을 조회하기 위해 반복문 안에서 DB 쿼리를 날리는 비효율 발생.

해결: 1. 현재 페이지에 필요한 댓글 ID 목록을 추출. 2. WHERE comment_id IN (...) 쿼리를 사용하여 해당 댓글들의 답글을 단 1번의 쿼리로 일괄 조회. 3. 애플리케이션 메모리 상에서 부모-자식 데이터를 매핑하여 병합.

Q3. SQL Injection 방지
문제: 배열 데이터를 SQL 쿼리에 삽입할 때 단순 문자열 병합을 사용할 경우 보안 취약점 발생 가능성.

해결: map((_, i) => $${i+1})을 사용하여 파라미터 바인딩($1, $2...)을 동적으로 생성. 입력값을 데이터로만 처리하도록 하여 SQL Injection 원천 차단.

<hr style="border:3px solid #aaa">

<h3>🚀 6. 설치 및 실행 (How to Run)</h3>
