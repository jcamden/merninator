import crypto from 'crypto';
import jsonwebtoken from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { IUser } from '../models/User';

const pathToKey = path.join(__dirname, '../../security/jwt', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

/**
 *
 * @param {*} password - The plain text password
 * @param {*} hash - The hash stored in the database
 * @param {*} salt - The salt stored in the database
 *
 * This function uses the crypto library to decrypt the hash using the salt and then compares
 * the decrypted hash/salt with the password that the user provided at login
 */
function validatePassword(password: crypto.BinaryLike, hash: string, salt: crypto.BinaryLike): boolean {
    const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}

/**
 *
 * @param {*} password - The password string that the user inputs to the password field in the register form
 *
 * This function takes a plain text password and creates a salt and hash out of it.  Instead of storing the plaintext
 * password in the database, the salt and hash are stored for security
 *
 * ALTERNATIVE: It would also be acceptable to just use a hashing algorithm to make a hash of the plain text password.
 * You would then store the hashed password in the database and then re-hash it to verify later (similar to what we do here)
 */
function genPassword(password: crypto.BinaryLike): { salt: string; hash: string } {
    const salt = crypto.randomBytes(32).toString('hex');
    const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return {
        salt: salt,
        hash: genHash,
    };
}

/**
 * @param {*} user - The user document object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
function issueJWT(user: IUser): { token: string; expires: string } {
    const _id = user._id;

    const expiresIn = '14d';

    const payload = {
        sub: _id,
        iat: Date.now(),
    };

    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
        expiresIn: expiresIn,
        algorithm: 'RS256',
    });

    // This is the format required for extraction method fromAuthHeaderAsBearerToken .
    // We could choose another option as well, such as providing the token in the body, or do something custom.
    // But this format in the header is pretty standard.
    return {
        token: 'Bearer ' + signedToken,
        expires: expiresIn,
    };
}

export { validatePassword, genPassword, issueJWT };
