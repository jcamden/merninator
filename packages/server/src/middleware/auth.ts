import jwt from 'jsonwebtoken';
import 'dotenv/config';

const auth = (req, res, next) => {
  //get token from header
  const token = req.header('x-auth-token');

  //check if there is no token
  if (!token) {
    return res.status(401).json({ msg: "y'ain't got no token; authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_DEV);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "yer token ain't valid" });
  }
};

export default auth;
