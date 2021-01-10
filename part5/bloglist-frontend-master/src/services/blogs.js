import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, object) => {
  object.likes += 1
  const request = axios.put(`${baseUrl}/${id}`, object)
  return request.then(response => {
    return response.data
  })
}

const remove = (id, object) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => {
    return response.data
  })
}



export default { getAll, create, update, setToken, remove }