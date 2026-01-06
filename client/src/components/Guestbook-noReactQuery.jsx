import React, {useEffect, useState} from "react";
import {FaTrash,FaChevronLeft, FaChevronRight} from 'react-icons/fa'; 
import { BASE_URL } from '../constants'

function Guestbook(){

    const [comments, setComments] = useState([]);
    // 새글 입력을 위한 state
    const initialFormState = { username: '', password: '', content: '' };
    const [formData, setFormData] = useState(initialFormState);

    const isAdmin = !!localStorage.getItem('token');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    // 방명록 목록 불러오기 (페이지 번호 받아서 요청)
    const fetchComments = (page) => {
        fetch(`${BASE_URL}/api/comments?page=${page}`) // 쿼리 스트링
            .then(res => res.json())
            .then(response => {

                if(response.data){
                    setComments(response.data);
                    setTotalPages(response.pagination.totalPages);
                    setCurrentPage(response.pagination.currentPage);
                }
            })
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchComments(currentPage);
    },[currentPage]);

    const handlePageChange = (newPage) => {
        if(newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    // 방명록 처리 핸들러
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name] : value});
    };
    // 방명록 제출 핸들러
    const handleSubmit = (e) => {
        e.preventDefault();

        if(!formData.username || !formData.password || !formData.content){
            return alert("모든 항목을 입력해주세요");
        } 

        fetch(`${BASE_URL}/api/comments`, {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(formData),
        })
        .then(res => {
            if(res.ok){
                alert("방명록이 등록되었습니다.");
                fetchComments(1); // 목록 다시 불러오기
                setCurrentPage(1);
                setFormData(initialFormState);
            }
        });
    };

    const handleReplySubmit = (e, commentId) => {
        e.preventDefault();
        const content = e.target.content.value;
        const token = localStorage.getItem('token');

        fetch(`${BASE_URL}/api/comments/${commentId}/replies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ content: content})
        })
        .then(res => {
            if(res.ok){
                e.target.reset();
                fetchComments(currentPage);
            }
        });
    };

    const handleDelete = (id) => {
        
        const inputPassword = window.prompt("비밀번호를 입력하세요");

        if(!inputPassword) return;

        fetch(`${BASE_URL}/api/comments/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify({ password : inputPassword}),
        })
        .then(res => {
            if(res.ok){
                alert('삭제 되었습니다.');
                setComments(comments.filter(comment => comment.id !== id)); // 화면 지우기
            }else if(res.status === 403){
                alert('비밀번호가 틀렸습니다.');
            }else{
                alert('오류 발생');
            }
        });
    };

    return (
        <section id="guestbook" className="section-spacer">
            <div className="container">

                <h2 className="section-title text-left fade-up-element">
                    Guest<span className="text-highlight">book</span>
                </h2>

                <div className="guestbook-form-wrapper fade-up-element delay-1">
                    <form onSubmit={handleSubmit} className="guestbook-form-card">
                        <div style={{marginBottom: '20px', color: '#ccc', textAlign: 'center', fontSize: '1.1rem'}}>
                            소중한 흔적을 남겨주세요
                        </div>
                        <div className="form-row">
                            <div className="col-sm">
                                <input 
                                    type="text" name="username" placeholder="닉네임" 
                                    className="guest-input"
                                    value={formData.username} onChange={handleChange}
                                />
                            </div>
                            <div className="col-lg">
                                <input 
                                    type="password" name="password" placeholder="비밀번호" 
                                    className="guest-input"
                                    value={formData.password} onChange={handleChange} 
                                />
                            </div>
                        </div>
                        <textarea 
                            name="content" placeholder="응원의 한마디를 남겨주세요!" rows="3"
                            className="guest-input guest-textarea"
                            value={formData.content} onChange={handleChange}
                            style={{ marginBottom:'15px'}} 
                        />
                        <button type="submit" className="btn btn-submit">남기기</button>
                    </form>
                </div>

                <div className="guestbook-grid fade-up-element delay-2">
                    {comments.map((comment) => (
                        <div key={comment.id} className="guestbook-card fade-up-element delay-2">
                            <div className="card-user-section">
                                <div className="card-header">
                                    <div className="user-info">
                                        <div className="avatar-circle">
                                            {/* 랜덤 이모지나 아이콘 */}
                                            👾
                                        </div>
                                        <div>
                                            <div className="user-name">{comment.username}</div>
                                            <small style={{ color: '#666', fontSize:'0.75rem' }}>
                                                {new Date(comment.created_at).toLocaleDateString()}
                                            </small>
                                        </div>
                                    </div>
                                    {/* 삭제 버튼 */}
                                    <button type="button" onClick={() => handleDelete(comment.id)} className="btn-icon-delete" style={{ position: 'relative', top: 'auto', right: 'auto' }}>
                                        <FaTrash />
                                    </button>
                                </div>

                                {/* 본문 */}
                                <p className="card-message">
                                    {comment.content}
                                </p>
                            </div>

                            {/* ⬛ 하단: 관리자/답글 영역 (어두운 배경으로 분리!) */}
                            {(isAdmin || (comment.replies && comment.replies.length > 0)) && (
                                <div className="card-admin-section">
                                    
                                    {/* 이미 달린 답글 보여주기 */}
                                    {comment.replies && comment.replies.length > 0 && (
                                        <div className="admin-reply-box">
                                            {comment.replies.map((reply) => (
                                                <div key={reply.id}>
                                                    <span className="reply-badge">Admin</span>
                                                    <p className="reply-text">&nbsp;{reply.content}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* 관리자 답글 입력창 */}
                                    {isAdmin && (
                                        <form onSubmit={(e) => handleReplySubmit(e, comment.id)} className="admin-reply-form">
                                            <input 
                                                type="text" name="content" placeholder="답글을 입력하세요..." 
                                                className="admin-input"
                                            />
                                            <button type="submit" className="btn-mini">등록</button>
                                        </form>
                                    )}
                                </div>
                            )}                           
                        </div>
                    ))}
                </div>

                {/* 페이징 */}
                {comments.length > 0 && (
                    <div className="pagination flex-center fade-up-element delay-3" style={{ marginTop: '40px', gap: '15px' }}>
                        <button
                            className="btn btn-outline"
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                            style={{ borderRadius: '50%', width: '40px', height: '40px', padding: 0 }}
                        >
                            <FaChevronLeft />
                        </button>

                        <span style={{ fontWeight: '600', color: '#fff', fontSize: '0.9rem' }}>
                            {currentPage} / {totalPages}
                        </span>

                        <button
                            className="btn btn-outline"
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                            style={{ borderRadius: '50%', width: '40px', height: '40px', padding: 0 }}
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                )}
            
            </div>
        </section>
    );


}

export default Guestbook;