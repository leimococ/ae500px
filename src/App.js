import React, { useReducer } from 'react'
import { StatusBar } from 'react-native'
import { ThemeProvider } from 'styled-components'

import Navigator from './Navigator'
import { Token } from './contexts'
import { theme } from './utils'

const App = () => {
  const [token, dispatchToken] = useReducer((state, token) => token, '') // ..replace '' with a DB-stored token for each user
  return (
    <ThemeProvider theme={theme}>
      <Token.Provider value={{ dispatchToken, token }}>
        <>
          <StatusBar barStyle='dark-content' />
          <Navigator />
        </>
      </Token.Provider>
    </ThemeProvider>
  )
}

export default App
