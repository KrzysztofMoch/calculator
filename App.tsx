import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LogBox, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import MainScreen from './src/screens/MainScreen';

const App = () => {
  // Ignores redux warning about serialization took a long time
  LogBox.ignoreLogs(['SerializableStateInvariantMiddleware']);

  return (
    <GestureHandlerRootView style={StyleSheet.absoluteFill}>
      <Provider store={store}>
        <MainScreen />
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
