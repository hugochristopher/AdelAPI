import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import { JwtPayload } from "jsonwebtoken";

export interface IUsers {
  id: string;
  nickName: string;
  email: string;
  password: string;
  updatedAt: String;
  createdAt: Date;
}

export interface IUserRegister {
  nickName: string;
  email: string;
  password: string;
}

export interface IUpdateUser {
  name?: string;
  email?: string;
  password?: string;
}

export interface ICurrentUser extends JwtPayload {
  id: string;
}

export interface IBodyLoginRequest extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    email: string;
    password: string;
  }
}

export interface IBodyRegisterRequest extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    nickName: string;
    email: string;
    password: string;
  }
}

export interface IUpdateRequest extends ValidatedRequestSchema {
  [ContainerTypes.Params]: {
    idUser: string;
  },
  [ContainerTypes.Body]: {
    nickName?: string;
    email?: string;
    password?: string;
  }
}
