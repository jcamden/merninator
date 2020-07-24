import { Router } from 'express';
import { getProjectRouter } from './getProject/getProject';
import { putProjectRouter } from './putProject/putProject';
import { deleteProjectRouter } from './deleteProject/deleteProject';
import { postProjectRouter } from './postProject/postProject';

const router = Router();

router.use('/', getProjectRouter);
router.use('/', postProjectRouter);
router.use('/', putProjectRouter);
router.use('/', deleteProjectRouter);

export default router;
