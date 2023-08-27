import { Router } from 'express'
import {
  createEndUser,
  getAllEndUsers,
  getEndUser,
  updateEndUser,
  deleteEndUser,
} from '../controllers/end-user.controller.js'

import verifyToken from '../middleware/middleware.js'
const endUserRouter = Router()

endUserRouter
  .get('/', getAllEndUsers)
  .get('/:endUserId', getEndUser)
  .post('/', createEndUser)
  .put('/:endUserId', verifyToken, updateEndUser)
  .delete('/:endUserId', verifyToken, deleteEndUser)

export default endUserRouter
