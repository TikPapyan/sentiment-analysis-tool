import JWT from 'jsonwebtoken';
import errorTexts from '../texts/errorTexts.js';
import User from '../models/User.js';

export default async (req, res, next) => {
	try {
		const authorizationData = req.headers.authorization;
		if(!authorizationData) throw errorTexts.unauthorized;
		const token = authorizationData.split(' ')[1];
		let decoded = await JWT.verify(token, 'asjd&343');

		const checkData = await User.find({id:decoded.id,findOne:true});
		if (!checkData) throw errorTexts.userNotFound;
		req.user = decoded
		next();
	} catch (err) {
		next(errorTexts.unauthorized);
	}
};