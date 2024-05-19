import { Router } from "express";
import loginRouter from "./login.routes.ts"

const router = Router()

router.get('/', (req, res) => {
  res.send('Welcome to Adel APP API!');
});

router.use('/login', loginRouter)



export default router