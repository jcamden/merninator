import fs from 'fs';
import path from 'path';

import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const auth = (req: Request, res: Response, next: NextFunction): void => {
    // get token from header
    // added x-auth-token if header is composed that way for some reason
    const token = req.header('Authorization') || req.headers['x-auth-token'];

    //check if there is no token
    if (!token) {
        return res.status(401).json({ msg: "y'ain't got no token; authorization denied" });
    }
    try {
        // if token is prefixed with 'Bearer ', strip it off
        const strippedToken = token.startsWith('Bearer ') ? token.slice(7, token.length).trimLeft() : token;

        const pathToKey = path.join(__dirname, '../security/jwt/', 'id_rsa_pub.pem');
        const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

        const decoded = jwt.verify(strippedToken, PUB_KEY, 'RS256');

        req.sub = decoded.sub;
        next();
    } catch (err) {
        res.status(401).json({
            err: err,
            msg: "yer token ain't valid",
        });
    }
};
