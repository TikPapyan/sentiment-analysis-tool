const text = {
	requiredFields: {
			code: 400,
			status: 'error',
			message: `is required`
	},
	noInformation: {
		code: 404,
		status: 'error',
		message: 'Ups: No information for this request!'
	},
	notFound: key => {
		return {
			code: 404,
			status: 'error',
			message: `${key} not Found`
		};
	},
	incorrectFormat: {
			code: 400,
			status: 'error',
			message: `Incorrect value`
	},
	badRequest: {
		status: 'error',
		message: 'The request the client made is incorrect or corrupt',
		code: 400
	},
	incorrectPassword: {
		status: 'error',
		message: 'Incorrect password',
		code: 400
	},
	userAlreadyExist: {
		status: 'error',
		message: 'User already exist',
		code: 400
	},
	wrongPassword: {
		status: 'error',
		message: 'Wrong password',
		code: 400
	},
	userNotFound: {
		status: 'error',
		message: 'User not found',
		code: 400
	},
	passwordIsNotMatched: {
		status: 'error',
		message: 'Password is not matched',
		code: 400
	},
	unauthorized: {
		status: 'error',
		message: 'It is required. No session found',
		code: 401
	},
};

export default text;