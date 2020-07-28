import { Router } from 'express';

import { putUserRouter } from './putUser/putUser';
import { deleteUserRouter } from './deleteUser/deleteUser';
import { getUsersProjectsRouter } from './getUsersProjects/getUsersProjects';

export const userRouter = Router();

userRouter.use('/', putUserRouter);
userRouter.use('/', deleteUserRouter);
userRouter.use('/', getUsersProjectsRouter);
