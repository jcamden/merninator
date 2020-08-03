import express from 'express';

import { authRouter } from './auth/auth';
import { projectRouter } from './project/project';
import { userRouter } from './user/user';

export const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/project', projectRouter);
