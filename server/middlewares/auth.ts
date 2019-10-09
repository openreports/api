import { decode } from '../../lib/jwt'

async function auth (req, res, next) {
  const decodedToken = await decode(req.cookies.token)
  req.user = decodedToken
  next()
}

export default auth