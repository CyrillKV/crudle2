import { Router } from 'express';
import { login, register } from '../controllers/user.controller';
import { auth } from '../middleware/auth';

const router = Router();

router.post('/login', auth, login);
router.post('/register', register);

export default router;
