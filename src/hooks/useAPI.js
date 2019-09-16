import axios from 'axios'
import { useContext } from 'react'

import config from '../../config'
import { Token } from '../contexts'

const requestNewToken = async () => {
  let token = ''
  try {
    const response = await axios.post(`${config.api}/auth`, { apiKey: config.apiKey })
    token = response.data && response.data.token
  } catch (error) {
    console.error(error.toString())
  }
  return token
}

const useAPI = () => {
  const { token, dispatchToken } = useContext(Token)
  return {
    image: async (id) => {
      let image = {}
      try {
        const response = await axios.get(`${config.api}/images/${id}`, { headers: { Authorization: 'Bearer ' + token } })
        image = response.data
      } catch (error) {
        console.error(error.toString())
      }
      return image
    },
    images: async (page) => {
      let images = []
      try {
        const response = await axios.get(`${config.api}/images?page=${page}`, { headers: { Authorization: 'Bearer ' + token } })
        images = response.data && response.data.pictures
      } catch (error) {
        if (error.toString() === 'Error: Request failed with status code 401') {
          const token = await requestNewToken()
          dispatchToken(token)
        }
      }
      return images
    }
  }
}

export default useAPI
