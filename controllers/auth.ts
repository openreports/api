async function logout (_req, res) {
  res.clearCookie('token')
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

export default {
  logout,
  check
}