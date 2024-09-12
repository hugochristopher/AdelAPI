import { NextFunction, Request, Response, Router } from "express";
import { createValidator } from "express-joi-validation";
import { bodySchemaLogin, bodySchemaRegister, bodySchemaUpdate } from "../middlewares/usersValidation";
import UsersController from "../controllers/users.controller";
import { authUser } from "../auth";
import { bodySchemaNewsCreation } from "../middlewares/newsValidation";
import NewsController from "../controllers/news.controller";
import multer from 'multer';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage })

const userController = new UsersController();
const newsController = new NewsController();

const router = Router()
const validator = createValidator({
  passError: true
})

router.get('/', (req, res) => {
  res.send('Welcome to Adel APP API');
});

router.post('/login', validator.body(bodySchemaLogin), userController.find)
router.post('/register', validator.body(bodySchemaRegister),  userController.store)
router.post('/update', validator.body(bodySchemaUpdate), authUser, userController.update)
router.post('/news', authUser, upload.single('img'), validator.body(bodySchemaNewsCreation),  newsController.store)
router.get('/news', authUser, newsController.find);



export default router