async function logout (_req, res) {
  res.clearCookie('token')
  res
    .status(200)
    .send({
      message: 'Successfully logged out'
    })
}

export default {
  logout
}