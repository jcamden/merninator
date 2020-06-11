import { Router } from 'express';
// import usersRoutes from './users';
import projectsRoutes from './projects';
const router = Router();

// router.use('/users', usersRoutes);
router.use('/projects', projectsRoutes);

export default router;
