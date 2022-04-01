import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { APP_COLORS } from '../common/colors';
import buttonsData, { buttonData } from '../common/buttonsData';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('screen');
const MAX_TRANSLATE_Y = SCREEN_HEIGHT * 0.7;
const BOTTOM_SPACE = 50;

const MainScreen = () => {
  // Add animated component for TouchableOpacity
  const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

  const translateY = useSharedValue<number>(0);
  const context = useSharedValue<{ y: number }>({ y: 0 });

  const mathFunctionContainerHeight = useSharedValue<number>(70);

  const gesture = Gesture.Pan()
    .onStart((event) => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      const newValue = event.translationY + context.value.y;

      if (MAX_TRANSLATE_Y > newValue && newValue > 0) {
        translateY.value = newValue;
      }
    })
    .onEnd((event) => {
      if (translateY.value > MAX_TRANSLATE_Y * 0.5) {
        translateY.value = withTiming(MAX_TRANSLATE_Y);
      } else if (
        translateY.value > MAX_TRANSLATE_Y * 0.2 &&
        translateY.value < MAX_TRANSLATE_Y * 0.5
      ) {
        translateY.value = withTiming(MAX_TRANSLATE_Y * 0.2);
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
      opacity: MAX_TRANSLATE_Y - translateY.value > 250 ? withTiming(1) : withTiming(0),
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

  // ------------------------- Render Functions -------------------------

  const renderCalcButton = (item: buttonData, index: number) => (
    <AnimatedTouchableOpacity
      style={[styles.calcButton, { backgroundColor: item.backgroundColor }, rCalcButton]}
    >
      <Text style={{ fontSize: item.fontSize }}>{item.text}</Text>
    </AnimatedTouchableOpacity>
  );

  const renderMathFunctions = () => {
    const isExpanded = useSharedValue<boolean>(false);

    const handleExpanded = () => {
      mathFunctionContainerHeight.value = withTiming(isExpanded.value ? 70 : 210);
      isExpanded.value = !isExpanded.value;
    };
    // ------------------------- Render Functions -------------------------

    return (
      <AnimatedTouchableOpacity
        style={[styles.mathFunctionsContainer, rMathFunctionsContainer]}
        onPress={handleExpanded}
      >
        <Animated.View style={[styles.mathFunctionsSubView, rMathFunctionsSubView]}>
          <View />
        </Animated.View>
      </AnimatedTouchableOpacity>
    );
  };

  return (
    <View style={StyleSheet.absoluteFill}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.topPanelContainer, rTopPanel]}>
          <View style={styles.line} />
        </Animated.View>
      </GestureDetector>
      <Animated.FlatList
        data={buttonsData}
        style={[styles.calcContainer, rCalcContainer]}
        renderItem={({ item, index }) => renderCalcButton(item, index)}
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
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
    borderRadius: 30,
  },
  mathFunctionsContainer: {
    width: SCREEN_WIDTH,
    backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'flex-end',
    alignContent: 'flex-start',
  },
  mathFunctionsSubView: {
    width: SCREEN_WIDTH - 60,
    backgroundColor: 'blue',
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
  },
});

export default MainScreen;
