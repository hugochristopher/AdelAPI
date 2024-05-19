import { Router } from "express";
import loginRouter from "./login.routes.ts"
import usersRouter from "./users.routes.ts"
import { createValidator } from "express-joi-validation";
import { bodySchemaLogin, bodySchemaRegister } from "../middlewares/usersValidation.ts";
import UsersController from "../controllers/users.controller.ts";

const userController = new UsersController();

const router = Router()
const validator = createValidator({
  passError: true
})

router.get('/', (req, res) => {
  res.send('Welcome to Adel APP API!');
});

router.use('/login', validator.body(bodySchemaLogin), userController.find)
router.use('/register', validator.body(bodySchemaRegister),  userController.store)



export default router