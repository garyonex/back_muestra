import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
// app.use(express.static('public'))
app.use(morgan('dev'))
let notes = [
  {
    id: 3,
    title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
    content:
      'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut'
  },
  {
    id: 1,
    title:
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    content:
      'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
  },
  {
    id: 2,
    title: 'qui est esse',
    content:
      'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla'
  }
]

// *---- INICIO DE SERVIDOR */
const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () =>
  console.log(`🚧 Server on http://localhost:${PORT}`)
)

server.on('error', (err) => console.log(err))
app.get('/api/notes', (req, res) => {
  res.json(notes)
})
app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find((note) => note.id === id)
  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})
app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter((note) => note.id !== id)

  res.status(204).end()
})
app.post('/api/notes', (req, res) => {
  const note = req.body
  if (!note || !note.content) {
    return res.status(400).json({
      error: 'no se encontro title ni content para creear nota'
    })
  }
  const ids = notes.map((note) => note.id)
  const maxId = Math.max(...ids)
  const newNote = {
    id: maxId + 1,
    title: note.title,
    content: note.content
  }
  notes = notes.concat(newNote)
  res.json(newNote)
})
