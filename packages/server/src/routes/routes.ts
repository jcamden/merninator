import express from 'express';

import { authRouter } from './auth/auth';
import { userRouter } from './user/user';
import { projectRouter } from './project/project';

export const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/project', projectRouter);
