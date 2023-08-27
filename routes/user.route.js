import { Router } from 'express'
import {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/user.controller.js'

import verifyToken from '../middleware/middleware.js'
const usersRouter = Router()

usersRouter
  .get('/', getAllUsers)
  .get('/:id', getUser)
  .post('/', createUser)
  .put('/:id', verifyToken, updateUser)
  .delete('/:id', verifyToken, deleteUser)
  // .post('/:userId/chatbots', verifyToken, createChatBot)
  // .get('/:userId/chatbots', verifyToken, getChatBot)
  // .get('/:userId/chatbots', verifyToken, getChatBot)



export default usersRouter
