import UserController from '../controllers/user'

export default (app) => {
  app.post('/users', UserController.create)
}