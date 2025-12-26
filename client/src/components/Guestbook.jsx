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
                <h2 className="section-title text-left fade-up-element">방명록</h2>

                <div className="form-wrapper fade-up-element delay-1">
                    <form onSubmit={handleSubmit} className="card">
                        <div className="form-row">
                            <div className="col-sm">
                                <input 
                                    type="text" name="username" placeholder="닉네임" 
                                    className="input-field"
                                    value={formData.username} onChange={handleChange}
                                />
                            </div>
                            <div className="col-lg">
                                <input 
                                    type="password" name="password" placeholder="비밀번호" 
                                    className="input-field"
                                    value={formData.password} onChange={handleChange} 
                                />
                            </div>
                        </div>
                        <textarea 
                            name="content" placeholder="응원의 한마디를 남겨주세요!" rows="3"
                            className="textarea-field"
                            value={formData.content} onChange={handleChange}
                            style={{ marginBottom:'15px'}} 
                        />
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>남기기</button>
                    </form>
                </div>

                <div className="guestbook-grid">
                    {comments.map((comment) => (
                        <div key={comment.id} className="card guestbook-card fade-up-element delay-2" >
                            <div className="flex-row" style={{ justifyContent: 'space-between', marginBottom: '10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    {/* 랜덤 아바타 느낌의 원 */}
                                    <div style={{
                                        width: '30px', height: '30px', borderRadius: '50%',
                                        background: '#cccccc'
                                    }}></div>
                                    <strong style={{ color: '#fff', fontSize: '1.05rem' }}>{comment.username}</strong>
                                </div>        
                                <small style={{ color: 'var(--text-muted)', fontSize:'0.8rem' }}>
                                    {new Date(comment.created_at).toLocaleDateString()}
                                </small>
                            </div>

                            <p style={{ margin: '15px 0', lineHeight: 1.6, color: '#e0e0e0', wordBreak: 'break-all' }}>
                                {comment.content}
                            </p>

                            {/* 답글 리스트 */}
                            {comment.replies && comment.replies.length > 0 && (
                                <div className="reply-box">
                                    {comment.replies.map((reply) => (
                                        <div key={reply.id} style={{ marginBottom: '5px', fontSize: '0.9rem' }}>
                                            <strong style={{ color: '#ec4899' }}>Admin:</strong>
                                            <span style={{ marginLeft: '5px', color: '#ccc' }}>{reply.content}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* 답글 달기 (관리자용) */}
                            {isAdmin && (
                                <form onSubmit={(e) => handleReplySubmit(e, comment.id)} style={{ marginTop: '15px', display: 'flex', gap: '5px'}}>
                                    <input type="text" name="content" placeholder="답글..." className="input-field" style={{padding: '5px 10px', fontSize:'0.8rem'}} />
                                    <button type="submit" className="btn btn-outline" style={{padding: '5px 10px', fontSize:'0.8rem'}}>등록</button>
                                </form>
                            )}
                            
                            {/* 삭제 버튼 */}
                            <button type="button" onClick={() => handleDelete(comment.id)} className="btn-icon-delete" style={{ position: 'absolute', top: '15px', right: '15px' }}>
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                </div>
                {/* 페이징 */}
                {comments.length > 0 && (
                    <div className="pagination flex-center fade-up-element delay-3" style={{ marginTop: '30px', gap: '15px' }}>
                        <button
                            className="btn btn-outline"
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            <FaChevronLeft />
                        </button>

                        <span style={{ fontWeight: 'bold', color: '#fff' }}>
                            {currentPage} / {totalPages}
                        </span>

                        <button
                            className="btn btn-outline"
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
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