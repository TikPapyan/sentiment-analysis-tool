import User from '../models/User.js';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import errorTexts from '../texts/errorTexts.js'
import successTexts from '../texts/successTexts.js'

const login = async (req, res, next) => {
	try {
		const {email, password} = req.body;
		const user = await User.find({email,findOne:1});
		if (!user) throw errorTexts.userNotFound;
		const match = await bcrypt.compare(password, user.password);
		if (!match) throw errorTexts.wrongPassword;

		const token = JWT.sign(
			{
				email: user.email,
				id: user.id,
			},
			"asjd&343",
			{expiresIn: 60 * 60 * 24 * 2}
		);

		const successData = {...successTexts.successAction};
		successData.data = {
			id: user.id,
			name: user.name,
			email: user.email,
			token
		};

		req.response = successData;
		next();
	} catch (err) {
		next(err);
	}
};

const register = async (req, res, next) => {

	try {
		const {email} = req.body;
		const status = 1;
		let user = await User.find({email, findOne: 1});
		if (user) throw errorTexts.userAlreadyExist;

		req.body.password = await bcrypt.hash(req.body.password, 10);

		await User.create(req.body);

		const successData = {...successTexts.successAction};
		req.response = successData;
		next();
	} catch (err) {
		next(err);
	}
};

export {login,register};