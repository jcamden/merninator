import { Router } from 'express';

import { deleteProjectRouter } from './deleteProject/deleteProject';
import { getProjectRouter } from './getProject/getProject';
import { postProjectRouter } from './postProject/postProject';
import { putProjectRouter } from './putProject/putProject';

export const projectRouter = Router();

projectRouter.use('/', getProjectRouter);
projectRouter.use('/', postProjectRouter);
projectRouter.use('/', putProjectRouter);
projectRouter.use('/', deleteProjectRouter);
