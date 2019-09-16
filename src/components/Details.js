import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Dimensions, Image, SafeAreaView, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'

import { useAPI } from 'ae500px/src/hooks'

const Back = styled.Text`
  color: ${({ theme }) => theme.white};
  font-size: 38px;
`

const Header = styled.View`
  align-self: flex-start;
  background-color: ${({ theme }) => theme.black};
  height: 48px;
  justify-content: center;
  padding-left: 10px;
  width: 100%;
`

const Info = styled.Text`
  color: ${({ theme }) => theme.white};
`

const Loading = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.sanMarino};
  height: 100%;
  justify-content: center;
`

const LoadingText = styled.Text`
  color: ${({ theme }) => theme.white};
  font-size: 16px;
`

const Main = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.black};
  height: 100%;
  justify-content: center;
  padding-bottom: 96px;
`

const Details = ({ navigation, theme }) => {
  const api = useAPI()
  const id = navigation.getParam('id')
  const [image, setImage] = useState({})
  const size = Math.floor(Dimensions.get('window').width)

  useEffect(() => {
    const fetch = async () => {
      const image = await api.image(id)
      setImage(image)
    }
    fetch()
  }, [id])

  const contents = image.id ? (
    <>
      <Header>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Gallery')}>
          <Back>{'<'}</Back>
        </TouchableOpacity>
      </Header>
      <Main>
        <Image
          source={{ uri: image.full_picture }}
          style={{ height: size, width: size }}
        />
        <Info>{image.author} - {image.camera}</Info>
      </Main>
    </>
  ) : <Loading><LoadingText>Loading image ${id}</LoadingText></Loading>

  return (
    <SafeAreaView>
      {contents}
    </SafeAreaView>
  )
}

export default withNavigation(Details)
