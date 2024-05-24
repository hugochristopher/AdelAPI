import { Router } from "express";
import { createValidator } from "express-joi-validation";
import { bodySchemaLogin, bodySchemaRegister, bodySchemaUpdate } from "../middlewares/usersValidation";
import UsersController from "../controllers/users.controller";
import { authUser } from "src/auth";

const userController = new UsersController();

const router = Router()
const validator = createValidator({
  passError: true
})

router.get('/', (req, res) => {
  res.send('Welcome to Adel APP API!');
});

router.post('/login', validator.body(bodySchemaLogin), userController.find)
router.post('/register', validator.body(bodySchemaRegister),  userController.store)
router.post('/update', validator.body(bodySchemaUpdate), authUser, userController.update)



export default router