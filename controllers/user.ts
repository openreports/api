import bcrypt from 'bcrypt'
import User, { IUser } from '../models/User'

const ROUNDS = parseInt(process.env.ROUNDS)

async function create (req, res, next) {
  const {
    email,
    name,
    password
  } = req.body

  if (!name || !email || !password) {
    res.status(400).json({
      errorMessage: 'One or more of the fields are missing'
    })
    return;
  }

  const user = await User.byEmail(email)

  if (user !== null) {
    res.status(400).json({
      errorMessage: 'Account with email address already exists'
    })
    return;
  }

  try {
    const passwordHash:string = await bcrypt.hashSync(password, ROUNDS)

    const newUser:IUser = new User({
      name,
      email,
      password: passwordHash
    })

    await newUser.save()

    res.status(201).json({
      name: name
    })
  } catch(err) {
    res.send({
      error: err
    })
  }
}

export default {
  create
}