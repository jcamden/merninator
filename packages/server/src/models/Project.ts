import mongoose from 'mongoose';
const { Schema } = mongoose;
import { IUser, UserSchema } from './User';

export const ProjectSchema = new Schema({
  title: String,
  //   users: [UserSchema],
});

interface IProjectSchema extends Document {
  _id: string;
  email: string;
  name: string;
  googleID: string;
  facebookID: string;
  createdAt: string;
  updatedAt: string;
}

ProjectSchema.methods.bark = function() {
  console.log(`${this.name} says, "WOOF!"`);
};

interface IProjectBase extends IProjectSchema {
  bark(): void;
}

export interface IProject extends IProjectBase {
  //   users: IUser['_id'];
}

const Project = mongoose.model('Project', ProjectSchema);

export default Project;
