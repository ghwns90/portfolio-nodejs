const contactService = require('../services/contactService');

const contactController = {
    createMessage : async (req, res) => {
        try{
            // 프론트에서 보낸 데이터
            const { name, email, subject, message } = req.body;

            if(!name || !email || !message) {
                return res.status(400).json({message: '필수 항목을 입력해주세요'});
            }

            await contactService.receiveContact({name, email, subject, message});

            res.status(200).json({message: '메일이 전송 되었습니다.'});
        }catch(err) {
            console.error(err);
            res.status(500).json({ message: '메일 전송 실패'});
        }
    },
    getMessages: async (req, res) => {
        try{
            const messages = await contactService.getAllMessages();
            res.json(messages);
        }catch(err){
            res.status(500).json({message: '로드 실패'});
        }
    },
    replyMessage: async (req, res) => {
        const {id} = req.params;
        const {email, content} = req.body;

        console.log("전달받은 데이터:", email, content);
        
        try{
            await contactService.replyToMessage(id, email, content);
            res.json({message: '답장 전송 성공'});
        }catch(err){
            console.error("답장 전송 중 에러 발생:", err);
            res.status(500).json({message: '답장 실패'});
        }
    },
    deleteMessage: async (req, res) => {
        try {
            await contactService.deleteMessage(req.params.id);
            res.json({message:'삭제 성공'});
        }catch(err){
            res.status(500).json({message:'삭제 실패'});
        }
    }
};

module.exports = contactController;