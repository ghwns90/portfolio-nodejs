const contactModel = require('../models/contactModel');
const nodemailer = require('nodemailer');
// 전송 객체(transporter) 설정 - 어떤 우체국 쓸건지 
const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
});

const contactService = {
    // 메일 전송 처리
    receiveContact : async (contactData) => {
        // DB 저장
        const savedMessage = await contactModel.create(contactData);

        const {name, email, subject, message} = contactData;
        // 메일 발송
        const mailOptions = {
            from: process.env.EMAIL_USER, // 보내는사람 나
            to: process.env.EMAIL_USER, // 받는사람 나
            replytTo: email, // 답장누르면 방문자 이메일로 가도록 설정
            subject: `[포트폴리오 문의] ${name}님으로부터 연락이 왔습니다`,
            html: `
                <h3>📬 포트폴리오 사이트에서 온 문의입니다.</h3>
                <ul>
                    <li><strong>이름:</strong> ${name}</li>
                    <li><strong>이메일:</strong> ${email}</li>
                    <li><strong>제목:</strong> ${subject}</li>
                </ul>
                <br>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `
        };

        await transporter.sendMail(mailOptions);
        return savedMessage;
    },
    // ------ contact 메세지 DB처리후 관리자 페이지 띄우기 ------
    getAllMessages: async () => {
        return await contactModel.getAll();
    },
    //삭제
    deleteMessage: async (id) => {
        return await contactModel.delete(id);
    },
    //답장 보내기
    replyToMessage: async (id, userEmail, replyContent) => {

        const safeContent = replyContent || "";

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: `[답장] 문의주신 내용에 대한 답변입니다. -윤호준-`,
            html:`
                <p>${safeContent.replace(/\n/g, '<br>')}</p>
                <br>
                <p>감사합니다.</p>
            `
        };
        await transporter.sendMail(mailOptions);

        await contactModel.markAsReplied(id);
    }

};

module.exports = contactService;