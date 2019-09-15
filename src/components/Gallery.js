import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { Dimensions, FlatList, Image, SafeAreaView, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'

import { Token } from '../contexts'
import { useAPI } from '../hooks'

const Header = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.sanMarino};
  height: 48px;
  justify-content: center;
`

const Title = styled.Text`
  color: ${({ theme }) => theme.white};
  font-size: 20px;
`

const Gallery = ({ navigation }) => {
  const [images, setImages] = useState([])
  const api = useAPI()
  const { token } = useContext(Token)

  const renderItem = ({ item }) => {
    const size = Math.floor(Dimensions.get('window').width / 2)
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Details', { id: item.id })}>
        <Image
          source={{ uri: item.cropped_picture }}
          style={{ height: size, width: size }}
        />
      </TouchableOpacity>
    )
  }

  useEffect(() => {
    const fetch = async () => {
      const images = await api.images()
      setImages(images)
    }
    fetch()
  }, [token])

  return (
    <SafeAreaView>
      <Header><Title>Gallery app</Title></Header>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )
}

export default withNavigation(Gallery)
