import * as mongoose from "mongoose";

export interface UserDocument extends mongoose.Document {
  username: string;
  hash: string;
  salt: string;
}
