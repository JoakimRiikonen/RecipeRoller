import axios from 'axios'
const baseUrl = '/api/recipes'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(res => res.data)
}

const getOne = (id) => {
  const request = axios.get(baseUrl + `/${id}`)
  return request.then(res => res.data)
}

const getCount = () => {
  const request = axios.get(baseUrl + '/count')
  return request.then(res => res.data)
}

export default { getAll, getOne, getCount }