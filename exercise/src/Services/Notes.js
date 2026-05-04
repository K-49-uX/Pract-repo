import axios from 'axios'

// ✅ Use relative path (since backend serves frontend)
const baseUrl = import.meta.env === 'development' 
? 'http://localhost:3001/api/notes' 
: '/api/notes'

// GET all notes
const getAll = () => {
  return axios.get(baseUrl).then(response => response.data)
}

// CREATE a new note
const create = (newObject) => {
  return axios.post(baseUrl, newObject)
    .then(response => response.data)
}

// UPDATE a note
const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
    .then(response => response.data)
}

// OPTIONAL (good practice)
const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default {
  getAll,
  create,
  update,
  remove,
}