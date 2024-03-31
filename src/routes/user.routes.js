import {Router} from 'express'
import { registerUser } from '../controllers/user.controller.js'

const router = Router()
// how will it be read is 'localhost:8000/users/register'
router.route('/register').post(registerUser)

export default router