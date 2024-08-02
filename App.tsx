import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import { store } from './src/app/store';
import AppNavigator from './src/navigation/AppNavigator';
import AppInitializer from './src/AppInitializer';

const App = () => {
  return (
    <Provider store={store}>
      <AppInitializer>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AppInitializer>
    </Provider>
  );
};

export default App;
