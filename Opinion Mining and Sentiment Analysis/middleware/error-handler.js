import errorTexts from '../texts/errorTexts.js';

export default async (error, req, res, next) => {
	let code, data;

	code = error.code && typeof error.code === 'number' ? error.code : 400;
	let errorMessage = error.type
		? errorTexts.badRequest.message
		: error.message || errorTexts.badRequest.message;

	data = {
		status: error.status || 'error',
		message: errorMessage
	};


	res.status(code).json(data);
};
