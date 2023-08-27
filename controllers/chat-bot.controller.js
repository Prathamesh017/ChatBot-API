import chatBotModel from '../models/chat-bot.model.js'
// import userModel from '../models/user.model.js'
export const createChatBot = async (req, res) => {
  try {
    let { name, description } = req.body

    let id = req.params.userId
    if (!(name, description)) {
      return res.status(400).json({
        status: 'Failure',
        message: 'Incomplete Data. Need name and description',
      })
    }

    if (!id) {
      return res.status(400).json({
        status: 'failure',
        message: 'id missing',
      })
    }

    if (id != req.user.id) {
      return res.status(401).json({
        status: 'failure',
        message: 'Not Authorizated',
      })
    }

    let chatBot = await chatBotModel.create({
      name,
      description,
      userId: id,
    })
    if (chatBot) {
      return res.status(201).json({
        status: 'success',
        data: chatBot,
        message: 'Chat Bot Created Successfully',
      })
    }
  } catch (err) {
    return res.status(400).json({
      status: 'failure',
      message: err.message,
    })
  }
}

export const getAllChatBotOfUser = async (req, res) => {
  try {
    const id = req.params.userId
    const chatBots = await chatBotModel.findAll({ where: { userId: id } })
    if (chatBots) {
      res.status(200).json({
        status: 'success',
        data: chatBots,
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
export const getChatBot = async (req, res) => {
  try {
    let id = req.params.chatBotId
    const chatBot = await chatBotModel.findOne({
      where: { id, userId: req.user.id },
      // include: chatModel,
    })
    if (!chatBot) {
      return res.status(404).json({
        status: 'failure',
        message: 'ChatBot not Found',
      })
    }
    return res.status(200).json({
      status: 'success',
      data: chatBot,
      message: 'Chat bot retrieved',
    })
  } catch (err) {
    return res.status(400).json({
      status: 'failure',
      message: err.message,
    })
  }
}

export const updateChatBot = async (req, res) => {
  try {
    let id = req.params.chatBotId
    let { name, description } = req.body
    if (!id) {
      return res.status(400).json({
        status: 'failure',
        message: 'id missing',
      })
    }
    const chatBotExists = await chatBotModel.findOne({
      where: { id, userId: req.user.id },
    })
    if (!chatBotExists) {
      return res.status(404).json({
        status: 'failure',
        message: 'Chatbot Doesnt exist',
      })
    }

    await chatBotModel.update(
      { name, description },
      {
        where: {
          id,
        },
      },
    )

    res.status(201).json({
      status: 'success',
      message: 'ChatBot Update Successfully',
    })
  } catch (err) {
    return res.status(400).json({
      status: 'failure',
      message: err.message,
    })
  }
}
export const deleteChatBot = async (req, res) => {
  try {
    let id = req.params.chatBotId
    if (!id) {
      return res.status(400).json({
        status: 'failure',
        message: 'id missing',
      })
    }
    const chatBotExists = await chatBotModel.findOne({
      where: { id, userId: req.user.id },
    })
    if (!chatBotExists) {
      return res.status(400).json({
        status: 'failure',
        message: 'ChatBot Doesnt Exist',
      })
    }

    await chatBotModel.destroy({
      where: {
        id,
      },
    })

    res.status(204).json({
      status: 'success',
      message: 'Chat Bot Deleted Successfully',
    })
  } catch (err) {
    return res.status(400).json({
      status: 'failure',
      message: err.message,
    })
  }
}
