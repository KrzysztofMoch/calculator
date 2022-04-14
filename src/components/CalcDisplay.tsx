import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { APP_COLORS } from '../common/colors';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducer } from '../redux/store';
import { TouchableOpacity } from 'react-native';
import { clearHistory } from '../redux/calculatorSlice';

interface CalcDisplayProps {
  historyListStyle: StyleProp<ViewStyle>;
  historyHeaderStyle: StyleProp<ViewStyle>;
  resultContainerHeight: number;
  closeHistory: () => void;
}

const CalcDisplay: React.FC<CalcDisplayProps> = ({
  historyListStyle,
  historyHeaderStyle,
  resultContainerHeight,
  closeHistory,
}) => {
  // ------------------------- Utilities -------------------------

  const calculatorData = useSelector((state: RootReducer) => state.calculator);
  const dispatch = useDispatch();

  // ------------------------- Handlers -------------------------

  const handleClearHistory = () => {
    dispatch(clearHistory());
  };

  // ------------------------- Render Functions -------------------------

  const renderHeader = () => (
    <Animated.View style={[historyHeaderStyle, styles.header]}>
      <TouchableOpacity style={styles.headerArrow} onPress={closeHistory}>
        <Text style={styles.headerArrowText}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.historyTitle}>history</Text>
      <TouchableOpacity style={styles.clearHistoryButton} onPress={handleClearHistory}>
        <Text style={styles.clearHistoryText}>{'Clear'}</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <View style={[{ height: resultContainerHeight }, styles.calcDisplay]}>
        <Text style={styles.calcDisplayText} numberOfLines={1}>
          {calculatorData.expr}
        </Text>
        <Text style={styles.calcDisplaySmallText} numberOfLines={1}>
          {calculatorData.result}
        </Text>
        <Text style={styles.calcDisplayDescription}>Current calculations</Text>
      </View>
      <Animated.View
        style={[
          historyListStyle,
          {
            backgroundColor: APP_COLORS.darkPurple,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        {renderHeader()}
      </Animated.View>
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
    paddingRight: 20,
    alignItems: 'flex-end',
    justifyContent: 'center',
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
  clearHistoryButton: {},
  clearHistoryText: {
    fontSize: 20,
    fontWeight: '600',
    marginRight: 8,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: APP_COLORS.purple,
  },
  headerArrow: {
    width: 50,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerArrowText: {
    fontSize: 32,
    fontWeight: '600',
  },
  historyTitle: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
    position: 'absolute',
    left: 0,
    right: 0,
    // move text behind buttons
    zIndex: -1,
  },
});

export default CalcDisplay;
