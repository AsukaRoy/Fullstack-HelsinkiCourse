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
  console.log(id);
  console.log(object);
  const request = axios.put(`${baseUrl}/${id}`, object)
  console.log(request);
  return request.then(response => {
    console.log(response);
    return response.data
  })
}




export default { getAll, create, update, setToken }