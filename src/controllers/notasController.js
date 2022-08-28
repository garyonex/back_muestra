import NoteDb from '../models/NoteSchema.js'
import UsersModel from '../models/UsersModel.js'
const NoteDB = NoteDb

// ** BUSCAR TODOS */
export const allNotes = async (req, res, next) => {
  const Notas = await NoteDB.find({}).populate('user', {
    username: 1,
    email: 1
  })
  res.json(Notas)
}
// **BUSCAR POR ID */
export const searchById = async (req, res, next) => {
  const { id } = req.params
  const note = await NoteDB.findById(id)
  try {
    if (note) {
      res.json(note)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
}

// ** ELIMINAR MEDIANTE ID */

export const removeById = async (req, res, next) => {
  const { id } = req.params
  await NoteDB.findByIdAndDelete(id)
  try {
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}

// ** CREAR UNA NUEVA */

export const newNoteCreate = async (req, res, next) => {
  const { content, title } = req.body
  // recuperar token antes de crear una nota
  const { userId } = req
  const user = await UsersModel.findById(userId) // recuperamos el usuario desde la base de datos importante el await ya que debemos esperar hasta que retorne la informacionpara que pueda continuar
  if (!content) {
    return res.status(400).json({
      error: 'no se encontro title ni content para creear nota'
    })
  }
  const newNote = await new NoteDB({
    title,
    content,
    user: userId // agregamos el usuario mediante el id
  })
  try {
    const savedNote = await newNote.save()
    user.notes = user.notes.concat(savedNote.id) // recuperamos al usuario con sus notas y le anyiadimos una mas
    await user.save()
    res.json(savedNote)
  } catch (error) {
    next(error)
  }
}

// **MODIFICAR MEDIANTE ID */

export const changeById = async (req, res, next) => {
  const { id } = req.params
  const note = req.body
  const newNoteUpdate = {
    title: note.title,
    content: note.content
  }
  const result = await NoteDB.findByIdAndUpdate(id, newNoteUpdate, {
    new: true
  })
  res.status(200).json(result)
}
