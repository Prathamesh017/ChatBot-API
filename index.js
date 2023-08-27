import express from 'express'
import connectDB from './config/database.js'
import bodyParser from 'body-parser'
import usersRouter from './routes/user.route.js'
// import chatBotRouter from './routes/chat-bot.router.js'
// import endUserRouter from './routes/end-user.router.js'

const app = express()
const port = 3000
var jsonParser = bodyParser.json()
app.use(jsonParser)

await connectDB()

app.get('/', (req, res) => {
  res.send('Welcome to Chat API')
})

app.use('/api/users', usersRouter)
// app.use('/chatbots', chatBotRouter)
// app.use('/endusers', endUserRouter)
app.listen(port, () => {
  console.log('Server is Running on Port', port)
})
