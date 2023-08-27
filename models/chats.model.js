import { DataTypes } from 'sequelize'
import sequelize from '../config/sequilize.js'
import chatBotModel from './chat-bot.model.js'
import endUserModel from './end-user.model.js'

const chatModel = sequelize.define(
  'chat',
  {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {},
)

chatBotModel.hasMany(chatModel)
chatModel.belongsTo(chatBotModel, { foreignKey: 'chatBotId' })

chatModel.belongsTo(endUserModel, { foreignKey: 'endUserId' })
endUserModel.hasMany(chatModel)
await chatModel.sync()
export default chatModel
