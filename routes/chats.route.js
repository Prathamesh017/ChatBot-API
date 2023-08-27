import { Router } from 'express'
import verifyToken from '../middleware/middleware.js'
import { getChat, updateChat, deleteChat } from '../controllers/chats.controller.js'
const chatRouter = Router()

chatRouter
  .get('/:conversationId', verifyToken, getChat)
  .put('/:conversationId', verifyToken, updateChat)
  .delete('/:conversationId', verifyToken, deleteChat)

export default chatRouter
