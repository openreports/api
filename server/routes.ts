import UserController from '../controllers/user'
import AuthController from '../controllers/auth'

export default (app) => {
  app.get('/', (_req, res) => {
    res.send('Hello from the other side 💠 of Open Reports')
  })
  app.post('/users', UserController.create)
  app.post('/auth', AuthController.check)
  app.post('/logout', AuthController.logout)
}