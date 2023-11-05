import { model, Schema, Document } from "mongoose";

export interface UserDocument extends Document {
  username: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true },
  password: { 
    type: String, 
    required: true },
});

export default model<UserDocument>("User", UserSchema);
