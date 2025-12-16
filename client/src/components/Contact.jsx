import React, { useState } from 'react';
import { BASE_URL } from '../constants';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        fetch(`${BASE_URL}/api/contact` , {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(formData),
        })
        .then(response => {
            if(response.ok){
                alert('메일이 성공적으로 전송되었습니다.');
                setFormData({name: '', email: '', subject: '', message: ''});
            }else{
                alert('전송에 실패했습니다.');
            }
        })
        .catch(err => {
            console.error(err);
            alert("서버 오류 발생");
        })
        .finally(() => {
            setLoading(false);
        });
    };

    return (
        <section id="contact" className="section-spacer">
            <h2 className="section-title text-center">Contact Me</h2>

            <div className="form-wrapper">
                <form onSubmit={handleSubmit} className="card card-content">
                    <div className="grid" style={{gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px'}}>
                        <input 
                            type="text" name="name" placeholder="이름" required
                            className="input-filed" value={formData.name} onChange={handleChange}
                        />
                        <input 
                            type="email" name="email" placeholder="이메일" required
                            className="input-filed" value={formData.email} onChange={handleChange}
                        />
                    </div>
                    <input 
                        type="text" name="subject" placeholder="제목" required
                        className="input-filed" style={{ marginBottom: '15px'}} 
                        value={formData.subject} onChange={handleChange}
                    />
                    <textarea
                        name="message" rows="5" placeholder="문의하실 내용을 적어주세요" required
                        className="textarea-field" style={{marginBottom: '15px'}}
                        value={formData.message} onChange={handleChange}
                    />

                    <button type="submit" className="btn btn-primary" style={{width:'100%'}} disabled={loading}>
                        {loading ? '전송 중..': '메일 보내기'}
                    </button>
                </form>
            </div>
        </section>
    )
}

export default Contact;