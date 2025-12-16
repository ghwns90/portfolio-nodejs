import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import RequireAuth from './components/RequireAuth';
import './App.css'

function App() {

  return (
    <div> 
      {/* 화면이 바뀌는 영역 (무대) */}
      <Routes>
        {/* path="/" : 메인 주소로 오면 <Home />을 보여줘라 */}
        <Route path="/" element={<Home />} />
        
        {/* path="/admin" : 관리자 주소로 오면 <Admin />을 보여줘라 */}
        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<RequireAuth><Admin /></RequireAuth>} />
      </Routes>
    </div>    
  );
}

export default App;
