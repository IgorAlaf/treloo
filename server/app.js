import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { config } from 'dotenv'
import router from './routes/index.js'
import sequelize from './db/db.config.js'
import { errorMiddleware } from './middlewares/error-middleware.js'
config()
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
)

app.use('/api', router)
app.use(errorMiddleware)

async function start() {
  try {
    await sequelize.sync().then(() => console.log('db is ready'))
    app.listen(process.env.PORT || 9000, () =>
      console.log('Server is connection')
    )
  } catch (e) {
    console.log('Cannot connect to the server')
  }
}

start()
