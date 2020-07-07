export default {
    allowedHeaders: ['Content-Type', 'x-auth-token', 'Authorization'],
    origin: 'https://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // preflightContinue: true,
};
