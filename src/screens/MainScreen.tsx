import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import { APP_COLORS } from '../common/colors';
import buttonsData, {
  buttonData,
  mathFunctionsButtonsData,
  mathFunctionsSubViewButtonsData,
} from '../common/buttonsData';
import CalcDisplay from '../components/CalcDisplay';
import CalcButton from '../components/CalcButton';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('screen');
const MAX_TRANSLATE_Y = SCREEN_HEIGHT * 0.7;
const BOTTOM_SPACE = 50;

const MainScreen = () => {
  // Add animated component for TouchableOpacity
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableWithoutFeedback);

  const translateY = useSharedValue<number>(0);
  const context = useSharedValue<{ y: number }>({ y: 0 });

  const mathFunctionContainerHeight = useSharedValue<number>(70);
  const [isMathSubViewExpanded, setIsMathSubViewExpanded] = useState<boolean>(false);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      const newValue = event.translationY + context.value.y;

      if (MAX_TRANSLATE_Y - BOTTOM_SPACE > newValue && newValue > 0) {
        translateY.value = newValue;
      }
    })
    .onEnd(() => {
      if (translateY.value > MAX_TRANSLATE_Y * 0.5) {
        translateY.value = withTiming(MAX_TRANSLATE_Y - BOTTOM_SPACE);
      } else if (
        translateY.value > MAX_TRANSLATE_Y * 0.2 &&
        translateY.value < MAX_TRANSLATE_Y * 0.5
      ) {
        translateY.value = withTiming(MAX_TRANSLATE_Y * 0.3);
      } else {
        translateY.value = withTiming(0);
      }
    });

  // ------------------------- Animated Styles -------------------------

  const rTopPanel = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const rCalcContainer = useAnimatedStyle(() => {
    return {
      height: MAX_TRANSLATE_Y - translateY.value,
      opacity: MAX_TRANSLATE_Y - translateY.value > 300 ? withTiming(1) : withTiming(0),
    };
  });

  const rCalcButton = useAnimatedStyle(() => {
    return {
      height:
        (MAX_TRANSLATE_Y - BOTTOM_SPACE - translateY.value - mathFunctionContainerHeight.value) / 5,
    };
  });

  const rMathFunctionsContainer = useAnimatedStyle(() => {
    return {
      height: mathFunctionContainerHeight.value,
    };
  });

  const rMathFunctionsSubView = useAnimatedStyle(() => {
    return {
      height: mathFunctionContainerHeight.value - 70,
    };
  });

  //@ts-ignore - useAnimatedStyle dont accept number for rotate
  const rMathFunctionsButton = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: isMathSubViewExpanded ? withTiming('90deg') : withTiming('-90deg'),
        },
      ],
    };
  });

  const rMathFunctionsSubViewButton = useAnimatedStyle(() => {
    return {
      height: isMathSubViewExpanded ? withTiming(70) : withTiming(0),
    };
  });

  const rHistoryListContainer = useAnimatedStyle(() => {
    return {
      height: translateY.value,
    };
  });

  // ------------------------- Render Functions -------------------------

  const renderMathFunctions = () => {
    const handleExpanded = () => {
      setIsMathSubViewExpanded((value) => !value);
      mathFunctionContainerHeight.value = withTiming(isMathSubViewExpanded ? 70 : 210, {
        duration: 500,
      });
    };
    // ------------------------- Render Functions -------------------------

    return (
      <Animated.View style={[styles.mathFunctionsContainer, rMathFunctionsContainer]}>
        <View style={styles.mathFunctionsButtonsContainer}>
          {mathFunctionsButtonsData.map((data) => (
            <CalcButton data={data} style={styles.mathFunctionsButton} />
          ))}
          <AnimatedTouchable
            style={[styles.mathFunctionsButton, rMathFunctionsButton]}
            onPressOut={handleExpanded}
          >
            <Text style={{ fontSize: 40 }}>{'>'}</Text>
          </AnimatedTouchable>
        </View>
        <Animated.View
          style={[
            styles.mathFunctionsSubView,
            rMathFunctionsSubView,
            { display: isMathSubViewExpanded ? 'flex' : 'none' },
          ]}
        >
          {mathFunctionsSubViewButtonsData.map((data) => (
            <CalcButton
              data={data}
              style={[styles.mathFunctionsSubViewButton, rMathFunctionsSubViewButton]}
            />
          ))}
        </Animated.View>
      </Animated.View>
    );
  };

  return (
    <View style={StyleSheet.absoluteFill}>
      <Animated.View style={[styles.topPanelContainer, rTopPanel]}>
        <GestureDetector gesture={gesture}>
          <View style={styles.lineContainer}>
            <View style={styles.line} />
          </View>
        </GestureDetector>
        <CalcDisplay
          historyListStyle={rHistoryListContainer}
          resultContainerHeight={
            SCREEN_HEIGHT - (MAX_TRANSLATE_Y + BOTTOM_SPACE + 25) /*25px is line height*/
          }
        />
      </Animated.View>
      <Animated.FlatList
        keyExtractor={(item, index) => index.toString() + item.text}
        data={buttonsData}
        style={[styles.calcContainer, rCalcContainer]}
        renderItem={({ item }) => (
          <CalcButton data={item} style={[styles.calcButton, rCalcButton]} />
        )}
        ListHeaderComponent={renderMathFunctions}
        numColumns={4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flex: 1,
    backgroundColor: 'red',
  },
  calcContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 4,
  },
  calcButton: {
    flex: 1,
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  line: {
    width: 50,
    height: 4,
    backgroundColor: APP_COLORS.white,
    borderRadius: 30,
  },
  lineContainer: {
    height: 25,
    width: SCREEN_WIDTH,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  mathFunctionsContainer: {
    width: SCREEN_WIDTH,
    display: 'flex',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  mathFunctionsButtonsContainer: {
    width: SCREEN_WIDTH - 20,
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
  },
  mathFunctionsButton: {
    width: (SCREEN_WIDTH - 60) / 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
  },
  mathFunctionsSubViewButton: {
    width: (SCREEN_WIDTH - 60) / 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
  },
  mathFunctionsSubView: {
    width: SCREEN_WIDTH - 60,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  topPanelContainer: {
    // create some space at the end
    height: SCREEN_HEIGHT - BOTTOM_SPACE,
    width: '100%',
    position: 'absolute',
    top: -MAX_TRANSLATE_Y,
    left: 0,
    right: 0,
    backgroundColor: APP_COLORS.purple,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column-reverse',
  },
});

export default MainScreen;
