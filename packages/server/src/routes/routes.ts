import express from 'express';

import { authRouter } from './auth/auth';
import user from './user/user';
import project from './project/project';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', user);
router.use('/project', project);

export default router;
