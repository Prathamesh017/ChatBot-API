import chatModel from '../models/chats.model.js';
import chatsModel from '../models/chats.model.js'

export const createChats = async (req, res) => {
  try {
    let { message,complete} = req.body

    let id = req.params.chatbotId
    if (!(message)) {
      return res.status(400).json({
        status: 'Failure',
        message: 'Incomplete Data.Need message and complete',
      })
    }

    if (!id) {
      return res.status(400).json({
        status: 'failure',
        message: 'chatbotId missing',
      })
    }

    if (id != req.user.id) {
      return res.status(401).json({
        status: 'failure',
        message: 'Not Authorizated',
      })
    }

    let chatsMessage = await chatsModel.create({
      message,
      complete,
      chatBotId: id,
      endUserId: req.user.id,
    })
    if (chatsMessage) {
      return res.status(201).json({
        status: 'success',
        data: chatsMessage,
        message: 'Chat Message Created Successfully',
      })
    }
  } catch (err) {
    return res.status(400).json({
      status: 'failure',
      message: err.message,
    })
  }
}


export const getAllChatsOfAChatBot = async (req, res) => {
  try {
    const id = req.params.chatbotId
    const chats = await chatsModel.findAll({ where: { chatBotId: id } })
    if (chats) {
      res.status(200).json({
        status: 'success',
        data: chats,
        message: 'ALL Chats Retrieved',
      })
    }
  } catch (err) {
    return res.status(400).json({
      status: 'failure',
      message: err.message,
    })
  }
}

export const getChat = async (req, res) => {
  try {
    let id = req.params.conversationId

  
    const chats = await chatsModel.findOne({
      where: { id,endUserId: req.user.id },

    })
    if (!chats) {
      return res.status(404).json({
        status: 'failure',
        message: 'Chats not Found',
      })
    }
    return res.status(200).json({
      status: 'success',
      data: chats,
      message: 'Chats retrieved',
    })
  } catch (err) {
    return res.status(400).json({
      status: 'failure',
      message: err.message,
    })
  }
}

export const updateChat = async (req, res) => {
  try {
    let id = req.params.conversationId
    let { message,complete } = req.body
    if (!id) {
      return res.status(400).json({
        status: 'failure',
        message: 'id missing',
      })
    }
    const chatExists = await chatModel.findOne({
      where: { id, endUserId: req.user.id },
    })
    if (!chatExists) {
      return res.status(404).json({
        status: 'failure',
        message: 'Conversion Doesnt exist',
      })
    }

    await chatModel.update(
      { message, complete },
      {
        where: {
          id,
        },
      },
    )

    res.status(201).json({
      status: 'success',
      message: 'Chat Update Successfully',
    })
  } catch (err) {
    return res.status(400).json({
      status: 'failure',
      message: err.message,
    })
  }
}
export const deleteChat = async (req, res) => {
  try {
    let id = req.params.conversationId
    if (!id) {
      return res.status(400).json({
        status: 'failure',
        message: 'id missing',
      })
    }
    const chatsExists = await chatModel.findOne({
      where: { id, endUserId: req.user.id },
    })
    if (!chatsExists) {
      return res.status(400).json({
        status: 'failure',
        message: 'Chats Doesnt Exist',
      })
    }

    await chatsModel.destroy({
      where: {
        id,
      },
    })

    res.status(204).json({
      status: 'success',
      message: 'Chats Deleted Successfully',
    })
  } catch (err) {
    return res.status(400).json({
      status: 'failure',
      message: err.message,
    })
  }
}
