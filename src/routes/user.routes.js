import { Router } from 'express'
import { checkUsers, createUser } from '../controllers/userController.js'
const userRoutes = Router()

userRoutes.post('/', createUser)
userRoutes.get('/', checkUsers)
export default userRoutes
