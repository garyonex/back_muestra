
import { inicialNotes, api } from './helpers/helper.js'
import { server } from '../server.js'
import mongoose from 'mongoose'
import NoteSchema from '../models/NoteSchema.js'

const NoteDB = NoteSchema

// --> todo ANTES DE INICIAR CADA TEST ELIMINA TODAS LAS NOTAS E INGRESA LAS QUE TE ESTOY PASANDO PARA VERIFICAR QUE ES CIERTO */
beforeEach(async () => {
  await NoteDB.deleteMany({})
  const note1 = new NoteDB(inicialNotes[0])
  await note1.save()
  const note2 = new NoteDB(inicialNotes[1])
  await note2.save()
}, 40000)
test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 30000)
test('there are two notes', async () => {
  const response = await api.get('/api/notes')
  expect(response.body).toHaveLength(inicialNotes.length)
}, 30000)
test('the notes contains', async () => {
  const response = await api.get('/api/notes')
  const contents = response.body.map((note) => note.content)
  expect(contents).toContain(
    'Nota que necesitamos para poder probar un test y que este nos demuestre su resultado'
  )
}, 30000)
test('a valid note can be added', async () => {
  const newNote = {
    title: 'sirven los test?',
    content:
      'los test sirven para verificar que todo este correctamente en todo momento y que por alguna razon podamos ver las cosas que estan fallando en el momento correcto'
  }
  await api
    .post('/api/notes')
    .send(newNote)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/notes')
  const contents = response.body.map((note) => note.content)
  expect(response.body).toHaveLength(inicialNotes.length + 1)
  expect(contents).toContain(newNote.content)
}, 30000)
test('note without content is not added', async () => {
  const newNote = {}
  await api.post('/api/notes').send(newNote).expect(400)
  const response = await api.get('/api/notes')
  expect(response.body).toHaveLength(inicialNotes.length)
}, 30000)
afterAll(() => {
  mongoose.connection.close()
  server.close()
})
