import crypto from 'crypto';

// TODO
export function verifyPassword(password: string, hash: string, salt: string): boolean {
  const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  console.log(hash);
  console.log(hashVerify);
  return hash === hashVerify;
  return true;
}
export function genPassword(password: string): { salt: string; hash: string } {
  const salt = crypto.randomBytes(32).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

  //ES6 object property value shorthand :)
  return {
    salt,
    hash,
  };
}
