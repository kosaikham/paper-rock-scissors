import React from 'react';
import {
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import { ScreenOrientation } from 'expo';

import Home from './src/views/Home';
import Player from './src/views/Player';
import Computer from './src/views/Computer';

export default function App() {

  React.useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  },[])

  const stackNavigator = createStackNavigator({
    Home: {
      screen: Home
    },
    Computer: {
      screen: Computer
    },
    Player: {
      screen: Player
    }
  },{
    defaultNavigationOptions: {
      header: null
    }
  });

  const AppContainer = createAppContainer(stackNavigator);

  return <AppContainer />;

}
