import UserController from '../controllers/user'
import AuthController from '../controllers/auth'
import ProjectController from '../controllers/project'

export default (app) => {
  app.get('/', (_req, res) => {
    res.send('Hello from the other side 💠 of Open Reports')
  })

  app.post('/users', UserController.create)

  app.get('/auth', AuthController.check)
  app.post('/auth', AuthController.create)

  app.post('/logout', AuthController.logout)

  app.post('/projects', ProjectController.create)
}