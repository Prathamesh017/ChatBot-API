// import chatBotModel from '../models/chat-bot.model.js'
import endUserModel from '../models/end-user.model.js'
import { generateToken } from '../utility/utility.js'

export const createEndUser = async (req, res) => {
  try {
    let { name, email } = req.body
    if (!(name && email)) {
      res.status(400).json({
        status: 'Failure',
        message: 'Incomplete Data',
      })
    }

    let user = await endUserModel.create({
      name,
      email,
    })

    if (user) {
      let token = await generateToken(user.id, user.email)
      res.status(201).json({
        status: 'success',
        data: user,
        token,
        message: 'END User Created Successfully',
      })
    }
  } catch (err) {
    return res.status(400).json({
      status: 'failure',
      message: err.message,
    })
  }
}

export const getAllEndUsers = async (req, res) => {
  try {
    const users = await endUserModel.findAll({})
    if (users) {
      res.status(200).json({
        status: 'success',
        data: users,
        message: 'ALL END Users Retrieved',
      })
    }
  } catch (err) {
    return res.status(400).json({
      status: 'failure',
      message: err.message,
    })
  }
}
export const getEndUser = async (req, res) => {
  try {
    let id = req.params.endUserId
    const user = await endUserModel.findOne({
      where: { id },
      // include:chatBotModel
    })
    if (!user) {
      return res.status(404).json({
        status: 'failure',
        message: 'User not Found',
      })
    }

    res.status(200).json({
      status: 'success',
      data: user,
      message: 'End Users Retrieved',
    })
  } catch (err) {
    return res.status(400).json({
      status: 'failure',
      message: err.message,
    })
  }
}
export const updateEndUser = async (req, res) => {
  try {
    let id = req.params.endUserId
    let { name, email } = req.body
    if (!id) {
      return res.status(400).json({
        status: 'failure',
        message: 'id missing',
      })
    }
    const userExists = await endUserModel.findOne({ where: { id } })
    if (!userExists) {
      return res.status(400).json({
        status: 'failure',
        message: 'No User Exists with this ID',
      })
    }
    if (req.user.id !== userExists.id) {
      return res.status(403).json({
        status: 'failure',
        message: 'Not Authorized',
      })
    }

    await endUserModel.update(
      { name, email },
      {
        where: {
          id,
        },
      },
    )

    res.status(201).json({
      status: 'success',
      message: 'END User Updated Successfully',
    })
  } catch (err) {
    return res.status(400).json({
      status: 'failure',
      message: err.message,
    })
  }
}
export const deleteEndUser = async (req, res) => {
  try {
    let id = req.params.endUserId
    if (!id) {
      return res.status(400).json({
        status: 'failure',
        message: 'id missing',
      })
    }
    const userExists = await endUserModel.findOne({ where: { id } })
    if (!userExists) {
      return res.status(400).json({
        status: 'failure',
        message: 'No User Exists with this ID',
      })
    }

    if (req.user.id !== userExists.id) {
      return res.status(403).json({
        status: 'failure',
        message: 'Not Authorized',
      })
    }

    await endUserModel.destroy({
      where: {
        id,
      },
    })

    res.status(204).json({
      status: 'success',
      message: 'End User Deleted Successfully',
    })
  } catch (err) {
    return res.status(400).json({
      status: 'failure',
      message: err.message,
    })
  }
}
