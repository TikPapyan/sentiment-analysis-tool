import errorTexts from '../texts/errorTexts.js';

export default async (req, res, next) => {
	try {
		if (!req.response) throw errorTexts.noInformation;
		const {code, status, message, data} = req.response;
		const responseData = {status, message, data};

		if (req.logId){
			let dataString = JSON.stringify(responseData);
			dataString = dataString.replace(/'/g, '\\\'');
		}

		res.status(code).send(responseData);
 	} catch (error) {
		next(error);
	}
};