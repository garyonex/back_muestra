import bcrypt from 'bcrypt'
import User from '../models/UsersModel.js'
import jwt from 'jsonwebtoken'

// **RECUPERAR EL USUARIO */

export const recoverUserPass = async (req, res) => {
  const { body } = req
  const { username, password } = body

  const user = await User.findOne({ username })
  const passCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passCorrect)) {
    res.status(401).json({
      error: 'invalid user or password'
    })
  }
  const userforToken = {
    id: user._id,
    username: user.username
  }
  const token = jwt.sign(userforToken, process.env.JWT_SECRET, {
    expiresIn: 60 * 60
  })
  res.send({
    username: user.username,
    email: user.email,
    token
  })
}
