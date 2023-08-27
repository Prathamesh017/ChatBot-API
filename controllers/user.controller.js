
import userModel from '../models/user.model.js'
import { hashPassword, generateToken } from '../utility/utility.js'
import chatBotModel from '../models/chat-bot.model.js'

export const createUser = async (req, res) => {
  try {
    let { name, email, password } = req.body
    if (!(name && email && password)) {
      res.status(400).json({
        status: 'Failure',
        message: 'Incomplete Data',
      })
    }
    let hashedPassword = await hashPassword(password)

    let user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    })

    if (user) {
      let token = await generateToken(user.id, user.email)
      res.status(201).json({
        status: 'success',
        data: user,
        token,
        message: 'User Created Successfully',
      })
    }
  } catch (err) {
    return res.status(400).json({
      status: 'failure',
      message: err.message,
    })
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.findAll({})
    if (users) {
      res.status(200).json({
        status: 'success',
        data: users,
        message: 'ALL Users Retrieved',
      })
    }
  } catch (err) {
    return res.status(400).json({
      status: 'failure',
      message: err.message,
    })
  }
}
export const getUser = async (req, res) => {
  try {
    
    let id = req.params.id
    const user = await userModel.findOne({
      where: { id },
      include:chatBotModel
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
      message: 'Users Retrieved',
    })
  } catch (err) {
    return res.status(400).json({
      status: 'failure',
      message: err.message,
    })
  }
}
export const updateUser = async (req, res) => {
  try {
    let id = req.params.id
    let { name, email } = req.body
    if (!id) {
      return res.status(400).json({
        status: 'failure',
        message: 'id missing',
      })
    }
    const userExists = await userModel.findOne({ where: { id } })
    if (!userExists) {
      return res.status(400).json({
        status: 'failure',
        message: 'No User Exists with this ID',
      })
    }
    if (req.user.id!==userExists.id) {
      return res.status(403).json({
        status: 'failure',
        message: 'Not Authorized',
      })
    }
    
    await userModel.update(
      { name, email },
      {
        where: {
          id,
        },
      },
    )

    res.status(201).json({
      status: 'success',
      message: 'User Updated Successfully',
    })
  } catch (err) {
    return res.status(400).json({
      status: 'failure',
      message: err.message,
    })
  }
}
export const deleteUser = async (req, res) => {
  try {
    let id = req.params.id
    if (!id) {
      return res.status(400).json({
        status: 'failure',
        message: 'id missing',
      })
    }
    const userExists = await userModel.findOne({ where: { id } })
    if (!userExists) {
      return res.status(400).json({
        status: 'failure',
        message: 'No User Exists with this ID',
      })
    }
    
    if (req.user.id!==userExists.id) {
      return res.status(403).json({
        status: 'failure',
        message: 'Not Authorized',
      })
    }

    await userModel.destroy({
      where: {
        id,
      },
    })

    res.status(204).json({
      status: 'success',
      message: 'User Deleted Successfully',
    })
  } catch (err) {
    return res.status(400).json({
      status: 'failure',
      message: err.message,
    })
  }
}
