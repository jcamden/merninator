import { Router } from 'express';

import { putUserRouter } from './putUser/putUser';
import { deleteUserRouter } from './deleteUser/deleteUser';
import { getUsersProjectsRouter } from './getUsersProjects/getUsersProjects';

const router = Router();

router.use('/', putUserRouter);
router.use('/', deleteUserRouter);
router.use('/', getUsersProjectsRouter);

export default router;
