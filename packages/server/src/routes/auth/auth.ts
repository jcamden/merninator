import { Router } from 'express';

import auth from './auth/auth';
import google from './google/google';
import login from './login/login';
import register from './register/register';

const router = Router();

router.use('/', auth);
router.use('/google', google);
router.use('/login', login);
router.use('/register', register);

export default router;
