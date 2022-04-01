import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { APP_COLORS } from '../common/colors';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('screen');
const MAX_TRANSLATE_Y = SCREEN_HEIGHT * 0.7;
const BOTTOM_SPACE = 50;

const MainScreen = () => {
  const translateY = useSharedValue<number>(0);
  const context = useSharedValue<{ y: number }>({ y: 0 });

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

  // ------------------------- Render Functions -------------------------

  return (
    <View style={StyleSheet.absoluteFill}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.topPanelContainer, rTopPanel]}>
          <View style={styles.line} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    width: 50,
    height: 4,
    backgroundColor: APP_COLORS.white,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
    borderRadius: 30,
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
