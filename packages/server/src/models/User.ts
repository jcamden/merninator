import mongoose from 'mongoose';
const { Schema } = mongoose;
import jwt from 'jsonwebtoken';
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

const isProduction = process.env.NODE_ENV === 'production';
const secretOrKey = isProduction ? process.env.JWT_SECRET_PROD : process.env.JWT_SECRET_DEV;

UserSchema.methods.bark = function() {
  console.log(`${this.name} says, "WOOF!"`);
};

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

interface IUserBase extends IUserSchema {
  bark(): void;
  generateJWT(): string;
}

export interface IUser extends IUserBase {
  projects: IProject['_id'];
}

const User = mongoose.model('User', UserSchema);

export default User;
