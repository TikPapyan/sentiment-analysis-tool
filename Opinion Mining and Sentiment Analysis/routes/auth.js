import express from 'express';
import validation from '../validation/auth.js';

const router = express.Router();
import {
	login,
	register
} from '../controllers/authController.js';

router.post('/login', validation.login,  login);

router.post('/register', validation.register, register);

router.post('/profile', validation.register, register);

export default router;