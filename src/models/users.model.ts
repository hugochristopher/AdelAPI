import { Schema, model } from "mongoose";
import { IUsers } from "../interfaces/usersInterface";

const Users = new Schema<IUsers>({
  id: { type: String },
  nickName: { type: String },
  email: { type: String },
  password: { type: String },
  updatedAt: { type: Date },
  createdAt: { type: Date }
}, { versionKey: false });

const UsersModel = model<IUsers>('Users', Users, 'Users');

export default UsersModel;