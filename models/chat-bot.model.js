import { Sequelize, DataTypes } from 'sequelize'
import sequelize from '../config/sequilize.js'
import userModel from './user.model.js'

const chatBotModel = sequelize.define(
  'chat-bot',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {},
)

chatBotModel.belongsTo(userModel, { foreignKey: 'userId' })
userModel.hasMany(chatBotModel)


await chatBotModel.sync()

export default chatBotModel
