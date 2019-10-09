import jwt from 'jsonwebtoken'

export interface Payload {
  email: String,
  name: String
}

async function encode (payload:Payload):Promise<String> {
  return await jwt.sign(payload, process.env.SECRET)
}

async function decode (token: String):Promise<Payload> {
  return await jwt.decode(token, process.env.SECRET)
}

export {
  encode,
  decode
}