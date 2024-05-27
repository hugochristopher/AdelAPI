import { Model } from "mongoose";
import UsersModel from "../models/users.model";
import { safeUser } from "../auth";
import {
  IUpdateUser,
  IUserRegister,
  IUsers,
} from "../interfaces/usersInterface";
import { IResponseObj } from "../interfaces/errorsInterface";
import {
  buildUpdateUser,
  buildUserToDb,
  checkUser,
  hashPassword,
} from "../functions/users";

class UsersService {
  private _userModel: Model<IUsers>;
  constructor() {
    this._userModel = UsersModel;
  }

  public find = async (
    email: string,
    password: string,
  ): Promise<IResponseObj> => {
    const userFound = await this._userModel.findOne({ email });
    if (!userFound) return { code: 404, message: "User not Found!" };
    if (!checkUser(password, userFound.password)) {
      return { code: 400, message: "Email or password incorrect!" };
    }
    const token = safeUser(userFound);
    return { code: 200, token };
  };

  public store = async ({
    nickName,
    email,
    password,
  }: IUserRegister): Promise<IResponseObj> => {
    const didUserExists = await this._userModel.find({ email });
    if (didUserExists.length) return { code: 409, message: "Email already registered!" };
    const userDb = await buildUserToDb({ nickName, email, password });
    const didCreate = await this._userModel.create(userDb);
    if (!didCreate) return { code: 500, message: "Error registering user! Try again later." };
    const token = safeUser(didCreate);
    return { code: 200, token };
  };

  public update = async ({
    nickName,
    email,
    password,
    id,
  }: Partial<IUsers>): Promise<IResponseObj> => {
    const userFounded = await this._userModel.find({ id });
    const newUserInfos: Partial<IUsers> = userFounded[0];
    if (userFounded.length) {
      if (nickName) newUserInfos.nickName = nickName;
      if (email) newUserInfos.email = email;
      if (password) newUserInfos.password = await hashPassword(password.toString());
      newUserInfos.updatedAt = new Date().toISOString();
    }
    const updated = await this._userModel.updateOne({ id }, newUserInfos);
    if (updated.acknowledged) {
      const token = safeUser(newUserInfos as IUsers);
      return { code: 200, token };
    }
    return { code: 500, message: "Something went wrong" };
  };
}

export default UsersService;
