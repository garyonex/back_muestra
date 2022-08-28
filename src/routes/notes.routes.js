import { Router } from 'express'
import {
  allNotes,
  changeById,
  newNoteCreate,
  removeById,
  searchById
} from '../controllers/notasController.js'
import authToken from '../middlewares/authToken.js'
const notesRoutes = Router()
notesRoutes.get('/', allNotes)
notesRoutes.get('/:id', searchById)
notesRoutes.delete('/:id', authToken, removeById)
notesRoutes.post('/', authToken, newNoteCreate)
notesRoutes.put('/id', authToken, changeById)
export default notesRoutes
