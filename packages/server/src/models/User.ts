import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    email: String,
    hash: String,
    salt: String,
});

interface IUserSchema extends Document {
    _id: string;
    email: {
        type: string;
        required: true;
        unique: true;
    };
    hash: string;
    salt: string;
}

// method types
type IUserBase = IUserSchema;

// linked document types
export type IUser = IUserBase;

const User = model<IUser>('User', UserSchema);
export default User;
