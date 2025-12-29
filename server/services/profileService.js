const profileModel = require('../models/profileModel');
const fs = require('fs');
const path = require('path');

const profileService = {
    getProfile: async () => {
        // 데이터 가공이 필요하면 여기서
        return await profileModel.get(1);
    },

    updateProfile: async (data) => {

        // 프로필사진을 바꿀때 과거 프로필사진 삭제
        const oldProfile = await profileModel.get(1);
        const oldImageUrl = oldProfile.profile_image_url;

        const { profile_image_url } = data; // 새로 들어온 이미지

        // 이미지가 바뀌었는지 확인 (새 이미지 URL이 들어왔고, 기존거랑 다르면)
        if(profile_image_url && oldImageUrl && profile_image_url !== oldImageUrl) {
            // http://localhost:5000/uploads/사진.jpg -> uploads/사진.jpg 로 변환
            // URL에서 파일명만 추출해서 실제 경로를 만듦
            const fileName = oldImageUrl.split('/uploads/')[1];

            if (fileName) {
                // 🚨 [수정 3] 가장 안전한 경로 탐색 (프로젝트 루트 기준)
                const filePath = path.join(process.cwd(), 'uploads', fileName);

                // 파일이 진짜 존재하면 삭제
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                    console.log(`🗑️ 기존 이미지 삭제 완료: ${fileName}`);
                }
            }
        }

        return await profileModel.update(data);
    }
};

module.exports = profileService;