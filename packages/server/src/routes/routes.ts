import express from 'express';

import auth from './auth/auth';
import user from './user/user';
import project from './project/project';
// Not necessary, but for documentation:
import passport from './passport/passport';

const router = express.Router();

router.use('/auth', auth);
router.use('/user', user);
router.use('/project', project);

// Not necessary, but for documentation:
router.use('/passport', passport);

export default router;
