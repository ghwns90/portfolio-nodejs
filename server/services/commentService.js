const commentModel = require('../models/commentModel');
const replyModel = require('../models/replyModel');
const LIMIT = 5; // 페이지당 5개씩

const commentService = {
    getAllComments: async (page=1) => {
        
        const offset = (page - 1) * LIMIT;

        const comments = await commentModel.getAll(LIMIT, offset);

        const commentIds = comments.map(comment => comment.id);

        let replies = [];
        if(commentIds.length > 0) {
            replies = await replyModel.findByCommentsIds(commentIds);
        }

        const commentsWithReplies = comments.map(comment => {
            return {
                ...comment,
                replies: replies.filter(reply => reply.comment_id === comment.id)
            };    
        });

        const totalCount = await commentModel.countAll();

        const totalPages = Math.ceil(totalCount/LIMIT);

        return {
            data: commentsWithReplies,
            pagination: {
                currentPage: Number(page),
                totalPages: totalPages,
                totalCount: totalCount,
                limit: LIMIT,
            }
        };
    },
    createReply: async (commentId, content) => {
        return await replyModel.create(commentId, content);
    },
    createComment: async (data) => {
        return await commentModel.create(data);
    },
    deleteComment: async (id, inputPassword) => {
        const comment = await commentModel.findById(id);
        if(!comment){
            throw new Error('NOT_FOUND'); // 방명록 없음
        }
        if(comment.password !== inputPassword){
            throw new Error('WRONG_PASSWORD'); // 비밀번호 틀림
        }
        // 통과하면 삭제 진행
        await commentModel.delete(id);
        return true;
    }
};

module.exports = commentService;