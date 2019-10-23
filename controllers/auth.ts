import bcrypt from 'bcrypt';
import User, { IUser } from '../models/User'
import { encode } from '../lib/jwt';

async function logout (_req, res) {
  res.clearCookie('token')
  res.clearCookie('name')
  res.clearCookie('project')
  res
    .status(200)
    .send({
      message: 'Successfully logged out'
    })
}

async function check (req, res) {
  res
    .status(200)
    .send({
      user: req.user
    })
}

async function create (req, res) {
  const { email, password } = req.body
  
  if (!email || !password) {
    res
      .status(400)
      .json({
        errorMessage: 'One or more of the fields are missing'
      })
    return;
  }

  try {
    const user:IUser = await User.byEmail(email)

    if (user) {
      if (await bcrypt.compareSync(password, user.password)) {
        const token:String = await encode({
          email: user.email,
          name: user.name
        })

        if (user.project) {
          res.cookie('project', user.project)
        }

        res
          .status(201)
          .cookie('token', token, {
            httpOnly: true
          })
          .cookie('name', user.name)
          .send({
            user
          })
      } else {
        res
          .status(401)
          .send({
            errorMessage: 'The password is incorrect'
          })
      }
      return
    } else {
      res
        .status(404)
        .send({
          errorMessage: 'We couldn\'t find any acccount associated with this email address'
        })
    }
  } catch (err) {
    console.error(err)
  }
}

export default {
  logout,
  check,
  create
}