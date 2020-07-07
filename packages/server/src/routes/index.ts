import auth from './auth';
import user from './user';
import express from 'express';
// Not necessary, but for documentation:
import passport from './passport';

const router = express.Router();

router.use('/auth', auth);
router.use('/user', user);
// Not necessary, but for documentation:
router.use('/passport', passport);

export default router;
