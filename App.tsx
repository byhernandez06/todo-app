import React from 'react';
import { Provider } from 'react-redux';

import { store } from './src/app/store';
import AppInitializer from './src/AppInitializer';

const App = () => {
  return (
    <Provider store={store}>
      <AppInitializer />
    </Provider>
  );
};

export default App;
