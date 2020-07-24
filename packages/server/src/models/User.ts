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

// using interface I-prefix here, cause I couldn't think of anything else
// would be non-exported IUserSchema if I wanted so subsequently add methods and/or linked documents
export interface IUser extends Document {
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
// interface IUserBase extends IUserSchema{};

// linked document types
// export interface IUser extends IUserBase{};

export const User = model<IUser>('User', UserSchema);
