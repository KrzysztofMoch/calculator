import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { APP_COLORS } from '../common/colors';
import { useSelector } from 'react-redux';
import { RootReducer } from '../redux/store';

interface CalcDisplayProps {
  historyListStyle: StyleProp<ViewStyle>;
  resultContainerHeight: number;
}

const CalcDisplay: React.FC<CalcDisplayProps> = ({ historyListStyle, resultContainerHeight }) => {
  const calculatorData = useSelector((state: RootReducer) => state.calculator);

  // ------------------------- Render Functions -------------------------

  return (
    <View style={styles.container}>
      <View style={[{ height: resultContainerHeight }, styles.calcDisplay]}>
        <Text style={styles.calcDisplayText}>{calculatorData.expr}</Text>
        <Text style={styles.calcDisplaySmallText}>{calculatorData.result}</Text>
        <Text style={styles.calcDisplayDescription}>Current calculations</Text>
      </View>
      <Animated.ScrollView
        style={[
          historyListStyle,
          {
            backgroundColor: APP_COLORS.darkPurple,
            width: '100%',
          },
        ]}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <Text>History is empty</Text>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  calcDisplay: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
  },
  calcDisplayDescription: {
    position: 'absolute',
    left: 5,
    top: 5,
    fontSize: 18,
    color: APP_COLORS.white,
    opacity: 0.5,
  },
  calcDisplayText: {
    fontSize: 72,
    color: APP_COLORS.white,
  },
  calcDisplaySmallText: {
    fontSize: 48,
    color: APP_COLORS.white,
    opacity: 0.7,
  },
});

export default CalcDisplay;
