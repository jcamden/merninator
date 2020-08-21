export const corsOptions = {
    allowedHeaders: ['Content-Type', 'x-auth-token', 'Authorization'],
    origin: ['http://localhost:3000', 'http://localhost:9009'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // preflightContinue: true,
};
