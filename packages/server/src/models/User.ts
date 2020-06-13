import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  username: String,
  hash: String,
  salt: String,
});

interface IUserSchema extends Document {
  _id: string;
  username: string;
  hash: string;
  salt: string;
}

// method types
interface IUserBase extends IUserSchema {}

// linked document types
export interface IUser extends IUserBase {}

const User = model<IUser>('User', UserSchema);
export default User;
