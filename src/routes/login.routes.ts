import { Request, Response, Router } from "express";

const router = Router()

router.post('/', (req: Request, res: Response) => {
  const { email, password } = req.body
  console.log('email', email)
  console.log('senha', password)
  res.status(200).json({ message: 'login'})
})

export default router;