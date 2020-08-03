import { Router } from 'express';

import { deleteUserRouter } from './deleteUser/deleteUser';
import { getUsersProjectsRouter } from './getUsersProjects/getUsersProjects';
import { putUserRouter } from './putUser/putUser';

export const userRouter = Router();

userRouter.use('/', putUserRouter);
userRouter.use('/', deleteUserRouter);
userRouter.use('/', getUsersProjectsRouter);
