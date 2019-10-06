require('dotenv-flow').config()
import express, { Express } from 'express'

// middlewares
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

const PORT:number = parseInt(process.env.PORT || '3000', 10)
const DB:string = process.env.DB

const app:Express = express()

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const { connection } = mongoose;

// middlewares
app.use(cors())
app.use(bodyParser.json({
  type: 'application/json'
}))

connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})