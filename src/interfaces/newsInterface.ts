import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";

export interface INews {
  title: string,
  description: string,
  url: string,
  createdAt: Date
}

export interface INewsStore {
  title: string,
  description: string,
  url: string,
}

export interface IBodyNewsCreationRequest extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    title: string;
    description: string;
    file: File
  }
}