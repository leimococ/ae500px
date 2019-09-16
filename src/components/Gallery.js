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
  const api = useAPI()
  const [complete, setComplete] = useState(false)
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const { token } = useContext(Token)

  const loadNextPage = () => {
    if (!complete && !loading) {
      setPage(page + 1)
    }
  }

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
    setLoading(true)
    const fetch = async () => {
      const more = await api.images(page)
      if (more.length) {
        setImages([...images, ...more])
      } else if (token.length) {
        setComplete(true)
      }
      setLoading(false)
    }
    fetch()
  }, [page, token])

  return (
    <SafeAreaView>
      <Header><Title>Gallery app</Title></Header>
      <FlatList
        bounces={false}
        data={images}
        keyExtractor={(item) => item.id}
        numColumns={2}
        onEndReached={loadNextPage}
        onEndReachedThreshold={1}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )
}

export default withNavigation(Gallery)
