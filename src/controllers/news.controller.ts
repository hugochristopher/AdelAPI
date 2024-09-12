import { Request, Response } from "express";
import { ValidatedRequest } from "express-joi-validation";
import NewsService from "../service/news.service";
import { IBodyNewsCreationRequest } from "../interfaces/newsInterface";

class NewsController {
  private _newsService: NewsService;
  constructor() {
    this._newsService = new NewsService();
  }

  public find = async (
    _req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { code, message } = await this._newsService.find();
      if (code !== 200) return res.status(code).json({ message });
      return res.status(code).json({ message });
    } catch (error) {
      console.log("error", error);
      return res
        .status(500)
        .json({ message: "Something went wrong try again later!" });
    }
  };

  public store = async (
    req: ValidatedRequest<IBodyNewsCreationRequest>,
    res: Response
  ): Promise<Response> => {
    try {
      const { title, description } = req.body;
      const { code, message } = await this._newsService.store({
        title,
        description,
        url: req.file.filename
      });
      if (code !== 200) return res.status(code).json({ message });
      return res.status(code).json({ message });
    } catch (error) {
      console.log("error", error);
      return res
        .status(500)
        .json({ message: "Something went wrong try again later!" });
    }
  };
}

export default NewsController;
