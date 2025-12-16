const profileModel = require('../models/profileModel');

const profileService = {
    getProfile: async () => {
        // 데이터 가공이 필요하면 여기서
        return await profileModel.get();
    },

    updateProfile: async (data) => {

        return await profileModel.update(data);
    }
};

module.exports = profileService;