const profileService = require('../services/profileService');

const profileController = {
    // 조회 요청 처리
    getProfile: async (req, res) => {
        try {
            const profile = await profileService.getProfile();

            if (!profile) {
                return res.status(404).json({ message: '프로필이 없습니다.' });
            }
            
            res.json(profile);

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: '서버 에러' });
        }
    },
    // 수정 요청 처리
    updateProfile: async (req, res) => {
        try {
            const updatedProfile = await profileService.updateProfile(req.body);

            res.json(updatedProfile);

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: '수정 실패' });
        }
    }
};

module.exports = profileController;