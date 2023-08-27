
import sequelize from "../config/sequilize.js"
import { DataTypes } from "sequelize"
// import chatModel from "./chats.model.js"


const endUserModel = sequelize.define(
  'end-user',
  {
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
    
  },
  {},
)

await endUserModel.sync()
export default endUserModel
