import React, {useEffect, useState} from "react";
import {FaTrash,FaChevronLeft, FaChevronRight} from 'react-icons/fa'; 
import { BASE_URL } from '../constants'

function Guestbook(){

    const [comments, setComments] = useState([]);
    // 새글 입력을 위한 state
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        content: '',
    });

    const isAdmin = !!localStorage.getItem('token');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    // 방명록 목록 불러오기 (페이지 번호 받아서 요청)
    const fetchComments = (page) => {
        fetch(`${BASE_URL}/api/comments?page=${page}`) // 쿼리 스트링
            .then(res => res.json())
            .then(response => {
                setComments(response.data);
                setTotalPages(response.pagination.totalPages);
                setCurrentPage(response.pagination.currentPage);
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchComments(1);
    },[comments]);

    const handlePageChange = (newPage) => {
        if(newPage >= 1 && newPage <= totalPages) {
            fetchComments(newPage);
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
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(formData),
        })
        .then(res => {
            if(res.ok){
                alert("방명록이 등록되었습니다.");
                fetchComments(1); // 목록 다시 불러오기
                setFormData({username : '', password : '', content : ''});
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
        <div id="guestbook" className="gestbook-section section-spacer">
            <h2 className="section-title text-left">💬 Guestbook</h2>

            <div className="form-wrapper">
                <form onSubmit={handleSubmit} className="card card-content">
                    <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                        <input 
                            type="text" name="username" placeholder="닉네임" 
                            className="input-field"
                            value={formData.username} onChange={handleChange}
                        />
                        <input 
                            type="password" name="password" placeholder="비밀번호 (삭제용)" 
                            className="input-field"
                            value={formData.password} onChange={handleChange} 
                        />
                    </div>
                    <textarea 
                        name="content" placeholder="응원의 한마디를 남겨주세요!" rows="3"
                        className="textarea-field"
                        value={formData.content} onChange={handleChange}
                        style={{ marginBottom:'15px'}} 
                    />
                    <button type="submit" className="btn btn-dark" style={{ width: '100%' }}>남기기</button>
                </form>
            </div>

            <div className="list-wrapper">
                {comments.map((comment) => (
                    <div key={comment.id} className="card card-content" style={{ marginBottom: '15px', position: 'relative' }}>
                        <div className="flex-row" style={{ justifyContent: 'space-between', marginBottom: '10px' }}>
                            <strong className="text-highlight">{comment.username}</strong>
                            <small style={{ color: '#999' }}>{new Date(comment.created_at).toLocaleDateString()}</small>
                        </div>
                        <p style={{ margin: 0, lineHeight: 1.6 }}>{comment.content}</p>
                        {/* 답글 리스트 */}
                        {comment.replies && comment.replies.length > 0 && (
                            <div style={{marginTop: '15px', paddingLeft: '20px', borderLeft:'3px solid #eee'}}>
                                {comment.replies.map((reply) => (
                                    <div key={reply.id} style={{
                                        backgroundColor: '#f8f9fa',
                                        padding: '10px',
                                        borderRadius: '8px',
                                        marginBottom: '5px',
                                        fontSize: '0.95rem'
                                    }}>
                                        <strong
                                            style={{ color: 'var(--primary-color)'}}
                                        >
                                            {reply.username}:
                                        </strong>
                                        <span style={{marginLeft: '8px'}}>{reply.content}</span>
                                    </div>
                                ))}
                            </div>    
                        )}

                        {/* 댓글 작성 form */}
                        {isAdmin && (
                            <form
                                onSubmit={(e) => handleReplySubmit(e, comment.id)}
                                style={{ marginTop: '15px', display: 'flex', gap: '10px'}}
                            >
                                <input 
                                    type="text" 
                                    name="content"
                                    placeholder="한마디 해주세요" 
                                    className="input-field"
                                    style={{flex: 1, padding: '8px'}}
                                />
                                <button type="submit" className="btn btn-primary" style={{padding: '8px 15px', fontSize: '0.9rem'}}>
                                    등록
                                </button>
                            </form>
                        )}
                        {/* 삭제 버튼 (쓰레기통 아이콘) */}
                        <button 
                            type="button"
                            onClick={() => handleDelete(comment.id)} 
                            className="btn-icon-delete"
                            style={{ position: 'absolute', top: '1px', right: '1px' }}
                        >
                        <FaTrash />
                        </button>
                    </div>
                ))}
            </div>
            {/* 페이징 */}
            {comments.length > 0 && (
            <div className="pagination flex-center" style={{ marginTop:'20px', gap: '10px'}}>
                <button 
                    className="btn btn-outline"
                    disabled={currentPage === 1}
                    onClick={()=> handlePageChange(currentPage - 1)}
                    style={{ padding: '5px 10px'}}
                >
                <FaChevronLeft />
                </button>

                <span style={{ fontWeight: 'bold', color: '#555' }}>
                    {currentPage} / {totalPages}
                </span>

                <button 
                    className="btn btn-outline"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    style={{ padding: '5px 10px' }}
                >
                <FaChevronRight />
                </button>
            </div>
            )}
        </div>
    );


}

export default Guestbook;