import auth from './auth';
import user from './user';
import express from 'express';

const router = express.Router();

router.use('/auth', auth);
router.use('/user', user);

export default router;
