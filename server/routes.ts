import UserController from '../controllers/user'

export default (app) => {
  app.get('/', (_req, res) => {
    res.send('Hello from the other side 💠 of Open Reports')
  })
  app.post('/users', UserController.create)
}