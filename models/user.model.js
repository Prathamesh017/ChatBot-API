import sequelize from '../config/sequilize.js'
import { DataTypes } from 'sequelize'
// import chatBotModel from './chat-bot.model.js'

const userModel = sequelize.define(
  'user',
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: 'user with this email already exists',
      },
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'email is not valid',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {},
)


await userModel.sync()
export default userModel
