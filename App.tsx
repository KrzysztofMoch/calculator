import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainScreen from './src/screens/MainScreen';
import { StyleSheet } from 'react-native';

const App = () => {
  return (
    <GestureHandlerRootView style={StyleSheet.absoluteFill}>
      <MainScreen />
    </GestureHandlerRootView>
  );
};

export default App;
