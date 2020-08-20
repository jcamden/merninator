import { Router } from 'express';

import { deleteProjectRouter } from './deleteProject/deleteProject';
import { getProjectRouter } from './getProject/getProject';
import { postProjectRouter } from './postProject/postProject';
import { postProjectFileRouter } from './postProjectFile/postProjectFile';
import { putProjectRouter } from './putProject/putProject';

export const projectRouter = Router();

projectRouter.use('/', deleteProjectRouter);
projectRouter.use('/', getProjectRouter);
projectRouter.use('/', postProjectRouter);
projectRouter.use('/', postProjectFileRouter);
projectRouter.use('/', putProjectRouter);
