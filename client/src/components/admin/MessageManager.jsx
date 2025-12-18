import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../constants';

function MessageManager(){
    const [messages, setMessages] = useState([]);
    const [replyMode, setReplyMode] = useState(null);

    useEffect(()=> {
        fetchMessages();
    }, []);

    const fetchMessages = () => {
        fetch(`${BASE_URL}/api/contact`, {
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        })
        .then(res => res.json())
        .then(data => setMessages(data));
    };

    const handleReply = (e, msg) => {

        e.preventDefault();
        const content = e.target.content.value;

        fetch(`${BASE_URL}/api/contact/${msg.id}/reply`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({email: msg.email, content})
        })
        .then(res => {
            if(res.ok){
                alert("답장이 전송되었습니다");
                setReplyMode(null);
                fetchMessages();
            }
        });
    };

    const handleDelete = (id) => {

        if(!window.confirm("삭제하시겠습니까?")) return;

        fetch(`${BASE_URL}/api/content/${id}`, {
            method: 'DELETE',
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        })
        .then(res => {
            if(res.ok){
                fetchMessages();
            }
        })
    }

    return (
        <div>
            <h3> Contact ({messages.length}) </h3>
            <div className="list-wraperr">
                {messages.map((msg) => (
                    <div key={msg.id} className="card" style={{marginBottom: '15px', padding: '20px', borderLeft: msg.is_replied ? '5px solid green' : '5px solid orange'}}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <div>
                                <strong>{msg.name}</strong> ({msg.email})
                                {msg.is_replied && <span style={{ marginLeft: '10px', color: 'green', fontSize: '0.8rem' }}>✅ 답장완료</span>}
                            </div>
                            <small>{new Date(msg.created_at).toLocaleString()}</small>
                        </div>
                        <h4 style={{ margin: '10px 0' }}>{msg.subject}</h4>
                        <p style={{ whiteSpace: 'pre-wrap', color: '#555' }}>{msg.message}</p>
                        
                        {/* 버튼 영역 */}
                        <div style={{ marginTop: '15px' }}>
                            {!msg.is_replied && (
                                <button onClick={() => setReplyMode(msg.id)} className="btn btn-primary" style={{ marginRight: '10px' }}>답장하기</button>
                            )}
                            <button onClick={() => handleDelete(msg.id)} className="btn btn-outline" style={{color:'red', borderColor:'red'}}>삭제</button>
                        </div>

                        {/* 답장 입력 폼 (이 글에 답장 모드일 때만 보임) */}
                        {replyMode === msg.id && (
                        <form onSubmit={(e) => handleReply(e, msg)} style={{ marginTop: '15px', padding: '15px', background: '#f0f0f0', borderRadius: '8px' }}>
                            <textarea name="content" rows="4" className="textarea-field" placeholder="답장 내용을 입력하세요..." required></textarea>
                            <div style={{ marginTop: '10px' }}>
                                <button type="submit" className="btn btn-dark">전송</button>
                                <button type="button" onClick={() => setReplyMode(null)} className="btn btn-outline" style={{ marginLeft: '5px' }}>취소</button>
                            </div>
                        </form>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MessageManager;