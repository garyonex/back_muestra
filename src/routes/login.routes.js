import { Router } from 'express'
import { recoverUserPass } from '../controllers/loginController.js'
const loginRouter = Router()
loginRouter.post('/', recoverUserPass)
export default loginRouter
