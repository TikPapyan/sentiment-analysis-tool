import express from 'express';

const router = express.Router();
import {
    profile
} from '../controllers/userController.js';

router.get('/profile', profile);

export default router;