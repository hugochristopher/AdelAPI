import { Model } from "mongoose";
import { safeUser } from "../auth";
import { IResponseObj } from "../interfaces/errorsInterface";
import {
  buildUserToDb,
  checkUser,
} from "../functions/users";
import { INews, INewsStore } from "../interfaces/newsInterface";
import NewsModel from "../models/news.model";

class NewsService {
  private _newsModel: Model<INews>;
  constructor() {
    this._newsModel = NewsModel;
  }

  private buildNewsUrls = async (news: INews[]) => news.map((info) => ({
    title: info.title,
    description: info.description,
    createdAt: info.createdAt,
    src: `${process.env.BASE_URL}/uploads/images/${info.url}`
  }))

  public find = async (): Promise<IResponseObj> => {
    const news = await this._newsModel.find();
    const treatedNews = await this.buildNewsUrls(news)
    if (treatedNews.length) return { code: 200, message: treatedNews }
    return { code: 404, message: 'News not found' };
  };

  public store = async ({
    title,
    description,
    url,
  }: INewsStore): Promise<IResponseObj> => {
    const newsInfos = {
      title,
      description,
      url,
      createdAt: new Date().toISOString()
    }
    const createNew = await this._newsModel.create(newsInfos)
    if (createNew._id) return { code: 200, message: 'News Created' }
    return { code: 500, message: 'Try again later' };
  };
}

export default NewsService;
