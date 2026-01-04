import React, { useState } from 'react';
import { BASE_URL } from '../constants';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

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
            <div className="container">
                <h2 className="section-title text-left fade-up-element" style={{ marginBottom: '40px' }}>
                    Contact <span className="text-highlight">Me</span>
                </h2>
            </div>

            {/* 대형 유리 카드 (Split Layout) */}
            <div className="contact-container fade-up-element delay-1">
                {/* 👈 [왼쪽] 정보 영역 */}
                <div className="contact-info">
                    <h3 className="contact-title">Let's work together!</h3>
                    <p className="contact-desc">
                        새로운 프로젝트, 협업 제안, 혹은 가벼운 커피챗도 환영합니다.<br/>
                        언제든 편하게 연락주세요! 🚀
                    </p>

                    <div className="contact-details">
                        <div className="contact-item">
                            <div className="icon-box"><FaEnvelope /></div>
                            <span>hojunior@example.com</span>
                        </div>
                        <div className="contact-item">
                            <div className="icon-box"><FaPhone /></div>
                            <span>010-1234-5678</span>
                        </div>
                        <div className="contact-item">
                            <div className="icon-box"><FaMapMarkerAlt /></div>
                            <span>Busan, South Korea</span>
                        </div>
                    </div>
                </div>

                {/* 👉 [오른쪽] 입력 폼 영역 */}
                <div className="contact-form-area">
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="col-sm" style={{flex:1}} >
                                <input 
                                    type="text" name="name" placeholder="이름"
                                    className="guest-input"
                                    value={formData.name} onChange={handleChange} required
                                />
                            </div>
                            <div className="col-g" style={{flex:1}}>
                                <input
                                    type="email" name="email" placeholder="이메일"
                                    className="guest-input"
                                    value={formData.email} onChange={handleChange} required
                                />
                            </div>
                        </div>

                        <input 
                            type="text" name="subject" placeholder="제목"
                            className="guest-input"
                            value={formData.subject} onChange={handleChange} required
                        />
                        <textarea
                            name="message" placeholder="문의하실 내용을 적어주세요"
                            className="guest-input guest-textarea"
                            value={formData.message} onChange={handleChange} rows="5" required
                        />
                        <button type="submit" className="btn-submit" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}>
                            <FaPaperPlane /> 메일 보내기
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Contact;