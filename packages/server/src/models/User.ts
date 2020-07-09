import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    givenName: {
        type: String,
        required: true,
    },
    familyName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    hash: String,
    salt: String,
    provider: {
        type: String,
        required: true,
        enum: ['local', 'google'],
    },
});

interface IUserSchema extends Document {
    _id: string;
    givenName: string;
    familyName: string;
    email: string;
    hash?: string;
    salt?: string;
    provider: 'local' | 'google';
    _v?: string;
}

// method types
type IUserBase = IUserSchema;

// linked document types
export type IUser = IUserBase;

const User = model<IUser>('User', UserSchema);
export default User;
