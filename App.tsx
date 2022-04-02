import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import MainScreen from './src/screens/MainScreen';

const App = () => {
  return (
    <GestureHandlerRootView style={StyleSheet.absoluteFill}>
      <Provider store={store}>
        <MainScreen />
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
