const commentService = require('../services/commentService');

const commentController = {
    getComments: async (req, res) => {
        try {
            // url에서 ?page=2 값을 꺼냄 ( 없으면 기본 값 1 )
            const page = req.query.page || 1;
            const result = await commentService.getAllComments(page);
            res.json(result);
        } catch (error) {
            console.error("댓글 불러오기 중 에러: ",error);
            res.status(500).json({message: '불러오기 실패'});
        }
    },
    createReply: async (req, res) => {
        const {id} = req.params; // 댓글 ID
        const {content} = req.body; // 댓글 내용

        try{
            const newReply = await commentService.createReply(id, content);
            res.status(201).json(newReply);
        }catch(err){
            res.status(500).json({message: '댓글 작성 실패'});
        }
    },
    createComment: async (req, res) => {
        try {
            const newComment = await commentService.createComment(req.body);
            res.status(201).json(newComment);
        } catch (error) {
            console.error("댓글 작성 중 에러: ",error);
            res.status(500).json({ message: '방명록 작성 실패'});
        }
    },

    deleteComment: async (req, res) => {

        const {id} = req.params;
        const {password} = req.body;

        try {
            await commentService.deleteComment(id, password);
            res.json({message: '삭제 성공'});
        } catch (error) {
            console.error("댓글 삭제 중 에러", error);
            if(error.message === 'NOT_FOUND'){
                return res.status(404).json({message: '존재하지 않는 글입니다.'});
            }else if(error.message ==='WRONG_PASSWORD'){
                return res.status(403).json({message: '비밀번호가 틀렸습니다.'});
            }

            res.status(500).json({ message: '서버 에러' });
        }
    },
};

module.exports = commentController;