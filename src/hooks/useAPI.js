import axios from 'axios'
import { useContext } from 'react'

import config from 'ae500px/config'
import { Token } from 'ae500px/src/contexts'

const requestNewToken = async () => {
  let token = ''
  try {
    const response = await axios.post(`${config.api}/auth`, { apiKey: config.apiKey })
    token = (response.data && response.data.token) || token
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
        image = response.data || image
      } catch (error) {
        console.error(error.toString())
      }
      return image
    },
    images: async (page) => {
      let images = []
      try {
        const response = await axios.get(`${config.api}/images?page=${page}`, { headers: { Authorization: 'Bearer ' + token } })
        images = (response.data && response.data.pictures) || images
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
