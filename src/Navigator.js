import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import { Details, Gallery } from 'ae500px/src/components'

const Navigator = createStackNavigator({
  Details: { screen: Details },
  Gallery: { screen: Gallery }
}, {
  defaultNavigationOptions: {
    gesturesEnabled: false
  },
  headerMode: 'none',
  initialRouteName: 'Gallery',
  transitionConfig: () => ({
    transitionSpec: {
      duration: 0
    }
  })
})

export default createAppContainer(Navigator)
