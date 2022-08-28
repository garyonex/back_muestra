import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import './db/database.js'
import notesRoutes from './routes/notes.routes.js'
import userRoutes from './routes/user.routes.js'
import notFound from './middlewares/notFound.js'
import loginRouter from './routes/login.routes.js'
import { handleErrors } from './middlewares/handleErrors.js'

export const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
// app.use(express.static('public'))
app.use(morgan('dev'))

// *---- INICIO DE SERVIDOR */
const PORT = process.env.PORT || 3001
export const server = app.listen(PORT, () =>
  console.log(`🚧 Server on http://localhost:${PORT}`)
)
server.on('error', (err) => console.log(err))
// ? ROUTES
app.use('/api/notes', notesRoutes)
app.use('/api/users', userRoutes)
app.use('/login', loginRouter)

// todo MANEJO DE ERRORES ROUTES
app.use(handleErrors)
app.use(notFound)
