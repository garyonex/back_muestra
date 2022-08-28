import UsersModel from '../models/UsersModel'
import bcrypt from 'bcrypt'
import { api } from './helpers/helper.js'
import { server } from '../server.js'
import mongoose from 'mongoose'

describe('creating a new user', () => {
  beforeEach(async () => {
    await UsersModel.deleteMany({})

    const passwordHash = await bcrypt.hash('pswd', 10)
    const user = new UsersModel({
      username: 'pruebaTest',
      email: 'passTest@email.com',
      passwordHash
    })
    await user.save()
  }, 40000)

  test('works as expected creating a fresh username', async () => {
    // extraemos la cantidad de usuarios cargados
    const usersDB = await UsersModel.find({})
    // extraera oda la informaciony la convertimos a json para leerla
    const usersAtStart = usersDB.map((user) => user.toJSON())

    // creamos un nuevo usuario para el test
    const newUser = {
      username: 'GaryTest',
      email: 'garytest@email.com',
      password: 'prueba123'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const userDBAfter = await UsersModel.find({})
    const userAtEnd = userDBAfter.map((user) => user.toJSON())
    expect(userAtEnd).toHaveLength(usersAtStart.length + 1)

    const userNames = userAtEnd.map((user) => user.username)
    expect(userNames).toContain(newUser.username)
  })
  // TODO test por resolver
  // test('creation fails with proper statuscode and message if username is already taken', async () => {
  //   const usersDB = await UsersModel.find({})
  //   const usersAtStart = usersDB.map((user) => user.toJSON())

  //   const newUser = {
  //     username: 'GaryTest',
  //     email: 'garytest@email.com',
  //     password: 'prueba123otra'
  //   }
  //   const result = await api
  //     .post('/api/users')
  //     .send(newUser)
  //     .expect(400)
  //     .expect('Content-Type', /application\/json/)
  //   expect(result.body.error.errors.username.message).toContain('`username` to be unique')
  //   const userDBAfter = await UsersModel.find({})
  //   const userAtEnd = userDBAfter.map((user) => user.toJSON())
  //   expect(userAtEnd).toHaveLength(usersAtStart.length)
  // })
  test('check all users', async () => {
    const users = UsersModel.find({})
    await api
      .get('/api/users')
      .send(users)
      .expect(200)
  }, 30000)
  // esto es para indicar que despues de cada test cierre las conexiones
  afterAll(() => {
    mongoose.connection.close()
    server.close()
  })
}, 30000)
