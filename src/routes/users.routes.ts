import { Request, Response, Router } from "express";

const router = Router()

router.post('/', async (req: Request, res: Response) => {
  const { email, password, nickName } = req.body
  console.log('email', email)
  console.log('senha', password)
  console.log('nickName', nickName)
  res.status(200).json({ message: 'User created!'})
})

export default router;