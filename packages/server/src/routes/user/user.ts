import { Router } from 'express';

import putUser from './putUser/putUser';
import deleteUser from './deleteUser/deleteUser';
import getUsersProjects from './getUsersProjects/getUsersProjects';

const router = Router();

router.use('/', putUser);
router.use('/', deleteUser);
router.use('/', getUsersProjects);

export default router;
