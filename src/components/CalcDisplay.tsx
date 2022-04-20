import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { APP_COLORS } from '../common/colors';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducer } from '../redux/store';
import { TouchableOpacity } from 'react-native';
import { clearHistory, History } from '../redux/calculatorSlice';

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
      <TouchableOpacity onPress={handleClearHistory}>
        <Text style={styles.clearHistoryText}>{'Clear'}</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderHistoryItem = ({ item: { expr, result } }: { item: History }) => {
    // ------------------------- Render Functions -------------------------

    return (
      <View style={styles.historyItem}>
        <Text style={styles.historyItemText}>{`${expr} = ${result}`}</Text>
      </View>
    );
  };

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
      <Animated.FlatList
        inverted
        style={[historyListStyle, styles.historyContainer]}
        contentContainerStyle={styles.historyContainerContent}
        data={calculatorData.history}
        keyExtractor={({ expr, result }, index) => expr + result + index}
        renderItem={renderHistoryItem}
      />
      {renderHeader()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  calcDisplay: {
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
  clearHistoryText: {
    fontSize: 20,
    fontWeight: '600',
    marginRight: 8,
  },
  header: {
    width: '100%',
    height: 50,

    // need move header by it height
    marginTop: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: APP_COLORS.purple,
  },
  headerArrow: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerArrowText: {
    fontSize: 32,
    fontWeight: '600',
  },
  historyContainer: {
    backgroundColor: APP_COLORS.darkPurple,
    width: '100%',
  },
  historyContainerContent: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'column-reverse',
  },
  historyItem: {
    width: '100%',
    marginVertical: 4,
    marginRight: 8,
  },
  historyItemText: {
    transform: [{ scaleY: -1 }],
    fontSize: 48,
    fontWeight: '500',
  },
  historyTitle: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '500',
    position: 'absolute',
    left: 0,
    right: 0,
    // move text behind buttons
    zIndex: -1,
  },
});

export default CalcDisplay;
