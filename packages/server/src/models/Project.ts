import { Schema, model } from 'mongoose';

import { IUser } from '../models/User';

const ProjectSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
    },
    { timestamps: true },
);

// using interface I-prefix here, cause I couldn't think of anything else
interface IProjectSchema extends Document {
    _id: string;
    title: string;
    completed: string;
    _v?: string;
}

// method types
type IProjectBase = IProjectSchema;

// linked document types
export interface IProject extends IProjectBase {
    user: IUser['_id'];
}

export const Project = model<IProject>('Project', ProjectSchema);
