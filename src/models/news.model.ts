import { Schema, model } from "mongoose";
import { INews } from "../interfaces/newsInterface";

const News = new Schema<INews>({
  title: { type: String },
  description: { type: String },
  url: { type: String },
  createdAt: { type: Date }
}, { versionKey: false });

const NewsModel = model<INews>('News', News, 'News');

export default NewsModel;