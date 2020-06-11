import fs from 'fs';
import { join } from 'path';
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import isValidUrl from '../utils/isValidURL';
import { IProject, ProjectSchema } from './Project';

export const UserSchema = new Schema(
  {
    provider: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true,
    },
    password: {
      type: String,
      trim: true,
      minlength: 6,
      maxlength: 60,
    },
    givenName: String,
    familyName: String,
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    facebookId: {
      type: String,
      unique: true,
      sparse: true,
    },
    projects: [ProjectSchema],
    username: String,
    name: String,
  },
  { timestamps: true },
);

interface IUserSchema extends Document {
  _id: string;
  email: string;
  password: string;
  givenName: string;
  familyName: string;
  googleID: string;
  facebookID: string;
  createdAt: string;
  updatedAt: string;
}

UserSchema.methods.bark = function() {
  console.log(`${this.name} says, "WOOF!"`);
};

UserSchema.methods.toJSON = function() {
  // if not exists avatar1 default
  // const absoluteAvatarFilePath = `${join(__dirname, '../..', process.env.IMAGES_FOLDER_PATH)}${this.avatar}`;
  // const avatar = isValidUrl(this.avatar)
  //   ? this.avatar
  //   : fs.existsSync(absoluteAvatarFilePath)
  //   ? `${process.env.IMAGES_FOLDER_PATH}${this.avatar}`
  //   : `${process.env.IMAGES_FOLDER_PATH}avatar2.jpg`;

  const avatar = `${process.env.IMAGES_FOLDER_PATH}avatar2.jpg`;

  return {
    id: this._id,
    provider: this.provider,
    email: this.email,
    username: this.username,
    avatar: avatar,
    name: this.name,
    role: this.role,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

const isProduction = process.env.NODE_ENV === 'production';
const secretOrKey = isProduction ? process.env.JWT_SECRET_PROD : process.env.JWT_SECRET_DEV;

UserSchema.methods.generateJWT = function() {
  const token = jwt.sign(
    {
      expiresIn: '12h',
      id: this._id,
      provider: this.provider,
      email: this.email,
    },
    secretOrKey,
  );
  return token;
};

UserSchema.methods.registerUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (errh, hash) => {
      if (err) {
        console.log(err);
      }
      // set pasword to hash
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

// const delay = (t, ...vs) => new Promise(r => setTimeout(r, t, ...vs)) or util.promisify(setTimeout)

export async function hashPassword(password) {
  const saltRounds = 10;

  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function(err, hash) {
      if (err) reject(err);
      else resolve(hash);
    });
  });

  return hashedPassword;
}

export const validateUser = user => {
  const schema = {
    avatar: Joi.any(),
    name: Joi.string()
      .min(2)
      .max(30)
      .required(),
    username: Joi.string()
      .min(2)
      .max(20)
      .regex(/^[a-zA-Z0-9_]+$/)
      .required(),
    password: Joi.string()
      .min(6)
      .max(20)
      .allow('')
      .allow(null),
  };

  return Joi.validate(user, schema);
};

// be sure to update this with all methods
interface IUserBase extends IUserSchema {
  bark(): void;
  generateJWT(): string;
}

export interface IUser extends IUserBase {
  projects: IProject['_id'];
}

const User = mongoose.model('User', UserSchema);

export default User;
