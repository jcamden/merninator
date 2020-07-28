import { Router } from 'express';
import { getProjectRouter } from './getProject/getProject';
import { putProjectRouter } from './putProject/putProject';
import { deleteProjectRouter } from './deleteProject/deleteProject';
import { postProjectRouter } from './postProject/postProject';

export const projectRouter = Router();

projectRouter.use('/', getProjectRouter);
projectRouter.use('/', postProjectRouter);
projectRouter.use('/', putProjectRouter);
projectRouter.use('/', deleteProjectRouter);
