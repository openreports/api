require('dotenv-flow').config()
import express, { Express } from 'express'
import mongoose from 'mongoose'

// middlewares
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import auth from './middlewares/auth'

import routes from './routes'

const PORT:number = parseInt(process.env.PORT || '3000', 10)
const DB:string = process.env.DB

const app:Express = express()

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(`📓 Database is connected`)
  })
  .catch(err => {
    console.error(err)
  })

const { connection } = mongoose;

// middlewares
app.use(cors({
  credentials: true,
  origin: process.env.APP_URL
}))
app.use(bodyParser.json({
  type: 'application/json'
}))
app.use(cookieParser())

// auth
app.use(auth)

routes(app)

connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(PORT, () => {
  console.log(`👂 Listening on ${PORT}`)
})