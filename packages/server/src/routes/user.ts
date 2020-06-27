import { Router, Request, Response } from 'express';
import User from '../models/User';
import auth from '../middleware/auth';

const router = Router();

router.get('/', auth, async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

export default router;
