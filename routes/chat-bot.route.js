import { Router } from 'express'
import { getChatBot,updateChatBot,deleteChatBot } from '../controllers/chat-bot.controller.js'
import { createChats,getAllChatsOfAChatBot  } from '../controllers/chats.controller.js'
import verifyToken from '../middleware/middleware.js'
const chatBotRouter = Router()

chatBotRouter
  .get('/:chatBotId', verifyToken, getChatBot)
  .put('/:chatBotId', verifyToken, updateChatBot)
  .delete('/:chatBotId', verifyToken, deleteChatBot)
  .post('/:chatbotId/conversations',verifyToken,createChats)
  .get('/:chatbotId/conversations',verifyToken,getAllChatsOfAChatBot)


export default chatBotRouter