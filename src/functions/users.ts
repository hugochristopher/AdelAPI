import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { IUpdateUser, IUserRegister, IUsers } from '../interfaces/usersInterface';

const hashPassword = (pass: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(pass, salt, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
  });
}

export const buildUserToDb = async ({ nickName, email, password }: IUserRegister)  => {
  const hashedPassword = await hashPassword(password);
  return {
    id: uuidv4(),
    nickName,
    email,
    password: hashedPassword,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString()
  }
}

export const checkUser = (pass: string, hash: string): boolean => {
  const isValid = bcrypt.compareSync(pass, hash)
  return isValid
}

export const buildUpdateUser = async (user: IUpdateUser): Promise<Partial<IUsers>> => {
  const finalObj = {} as Partial<IUsers>
  if (user.password) finalObj.password = await hashPassword(user.password)
  finalObj.updatedAt = new Date().toISOString()
  return { ...user, ...finalObj }
}