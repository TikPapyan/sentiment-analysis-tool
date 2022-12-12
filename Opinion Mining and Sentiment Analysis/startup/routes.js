import auth from '../routes/auth.js';
import user from '../routes/user.js';
import successResponse from '../middleware/success-handler.js';
import errorResponse from '../middleware/error-handler.js';
import authMiddleware from '../middleware/auth.js';

export default app => {
	// app.use('/web', routes.web);
	app.use('/api/auth', auth);

	app.use('/api/user',authMiddleware, user);

	app.use('/*', successResponse);

	app.use('/*', errorResponse);

	app.use(function (req, res, next) {
		const data = {
			status: 'error',
			message: 'Ups: No information for this request!'
		};
		res.status(404).json(data);
	});
};