import axios from 'axios'

// In dev, Vite proxy forwards /api to localhost:3001 (see vite.config.js).
// In production (separate Render services), set VITE_API_URL in the
// frontend service env to: https://<your-backend>.onrender.com/api/notes
const baseUrl = import.meta.env.VITE_API_URL || '/api/notes'

const getAll = () =>
  axios.get(baseUrl).then((response) => response.data)

const create = (newObject) =>
  axios.post(baseUrl, newObject).then((response) => response.data)

const update = (id, newObject) =>
  axios.put(`${baseUrl}/${id}`, newObject).then((response) => response.data)

const remove = (id) =>
  axios.delete(`${baseUrl}/${id}`)

export default { getAll, create, update, remove }