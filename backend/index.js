const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
// ===== LOGGER =====
app.use((req, res, next) => {
  console.log(req.method, req.path)
  next()
})





// ===== IN-MEMORY DATA =====
let notes = [
  { id: '1', content: 'HTML is easy', important: true },
  { id: '2', content: 'Browser can execute only JavaScript', important: false },
  { id: '3', content: 'GET and POST are important', important: true },
]

// ===== API ROUTES =====
app.get('/api/notes', (req, res) => {
  console.log('GET /api/notes called')
  res.json(notes)
})
// ===== HEALTH CHECK =====
app.get('/', (req, res) => {
  res.json(notes)
})


app.get('/api/notes/:id', (req, res) => {
  const note = notes.find(n => n.id === req.params.id)
  if (note) return res.json(note)
  res.status(404).end()
})

app.post('/api/notes', (req, res) => {
  const body = req.body

  if (!body.content) {
    return res.status(400).json({ error: 'content missing' })
  }

  const newNote = {
    id: String(Date.now()),
    content: body.content,
    important: body.important || false,
  }

  notes = notes.concat(newNote)
  res.json(newNote)
})

app.put('/api/notes/:id', (req, res) => {
  const id = req.params.id
  const updated = req.body

  notes = notes.map(n => (n.id === id ? { ...n, ...updated } : n))

  res.json(updated)
})

app.delete('/api/notes/:id', (req, res) => {
  notes = notes.filter(n => n.id !== req.params.id)
  res.status(204).end()
})

// ===== UNKNOWN ENDPOINT =====
app.use((req, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
})

// ===== START SERVER =====
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})