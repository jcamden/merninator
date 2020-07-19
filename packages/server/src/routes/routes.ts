import express from 'express';

import auth from './auth/auth';
import user from './user/user';
import project from './project/project';

const router = express.Router();

router.use('/auth', auth);
router.use('/user', user);
router.use('/project', project);

export default router;
