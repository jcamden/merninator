import { Router } from 'express';

import { authRootRouter } from './auth/auth';
import { googleRouter } from './google/google';
import { loginRouter } from './login/login';
import { registerRouter } from './register/register';

export const authRouter = Router();

authRouter.use('/', authRootRouter);
authRouter.use('/google', googleRouter);
authRouter.use('/login', loginRouter);
authRouter.use('/register', registerRouter);
