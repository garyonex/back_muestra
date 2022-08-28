import UsersModel from '../models/UsersModel.js'
import bcrypt from 'bcrypt'

// **CREATE NEW USER */

export const createUser = async (req, res) => {
  const { body } = req
  const { username, email, password } = body

  try {
    const saltOrRound = 10
    const passwordHash = await bcrypt.hash(password, saltOrRound)
    const user = new UsersModel({
      username,
      email,
      passwordHash
    })
    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch (error) {
    console.log(error)
    res.status(400).json({ error })
  }
}

export const checkUsers = async (req, res) => {
  const users = await UsersModel.find({}).populate('notes', {
    title: 1,
    content: 1,
    id: 0
    // con esto le indico que quiero q me muestre de las notas
  })
  res.json(users)
}
