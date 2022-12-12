import User from '../models/User.js';
import errorTexts from '../texts/errorTexts.js'
import successTexts from '../texts/successTexts.js'

const profile = async (req, res, next) => {
    try {
        const user = await User.find({id:req.user.id,findOne:1});

        const successData = {...successTexts.successAction};
        successData.data = user

        req.response = successData;
        next();
    } catch (err) {
        next(err);
    }
};

export {profile};