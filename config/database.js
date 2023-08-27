import sequelize from './sequilize.js'

const connectDB = async () => {
  try {
    await sequelize.sync()
    console.log('Connection has been established successfully.')
    console.log('ALL Tables are Schronoused')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

export default connectDB
