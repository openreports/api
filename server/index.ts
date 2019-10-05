import express from 'express'

// middlewares
import cors from 'cors'

const app = express()

// middlewares
app.use(cors())

app.listen(3000, () => {
  console.log('Listening on 3000')
})