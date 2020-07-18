import { Router } from 'express';
import getProjects from './getProject/getProject';
import putProject from './putProject/putProject';
import deleteProject from './deleteProject/deleteProject';
import postProject from './postProject/postProject';

const router = Router();

router.use('/', getProjects);
router.use('/', postProject);
router.use('/', putProject);
router.use('/', deleteProject);

export default router;
