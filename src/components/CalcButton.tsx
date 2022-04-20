import React from 'react';
import {
  Platform,
  StyleProp,
  Text,
  ToastAndroid,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import { buttonData } from '../common/buttonsData';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { all, create } from 'mathjs';
import { useDispatch, useSelector } from 'react-redux';
import { addToHistory, setEqualled, setExpr, setResult } from '../redux/calculatorSlice';
import { RootReducer } from '../redux/store';

interface CalcButtonProps {
  data: buttonData;
  style: StyleProp<ViewStyle>;
}

const CalcButton: React.FC<CalcButtonProps> = ({ data, style }) => {
  const { text: buttonText, fontSize, backgroundColor, type: buttonType } = data;
  const borderRadius = useSharedValue<number>(40);
  const opacity = useSharedValue<number>(1);

  // ------------------------- Utilities -------------------------

  const Mathjs = create(all);

  const ln = (num: number) => Math.log(num);
  ln.transform = (num: number) => ln(num);
  Mathjs.import({ ln: ln }, {});

  const calculatorData = useSelector((state: RootReducer) => state.calculator);
  const dispatch = useDispatch();

  const convertSymbols: (value: string) => string = (value) => {
    const map = {
      x: '*',
      '𝝿': '(22/7)',
      '√': 'sqrt(',
    };

    const newValue = value.replace(/x|𝝿|√/gi, (m) => {
      //@ts-ignore
      return map[m];
    });

    return newValue;
  };

  const isNumber: (expr: string) => boolean = (expr) => {
    return !isNaN(parseFloat(expr));
  };

  // ------------------------- Handlers -------------------------

  const calculate = () => {
    if (calculatorData.equalled) {
      return;
    }

    let result = calculatorData.result;
    let exprString = convertSymbols(calculatorData.expr.join(''));

    // ---- brackets fix ----

    let leftBracketCount = exprString.match(/\(/g)?.length;
    let rightBracketCount = exprString.match(/\)/g)?.length;

    if (leftBracketCount !== rightBracketCount) {
      // check if we have any brackets
      if (!leftBracketCount) {
        return;
      }

      // check if we have any right brackets, bcs this can be null
      rightBracketCount = rightBracketCount ? rightBracketCount : 0;

      while (leftBracketCount > rightBracketCount) {
        exprString += ')';
        rightBracketCount += 1;
      }
    }

    // ---- try calculate string ----

    try {
      result = Mathjs.evaluate(exprString).toString();
      dispatch(addToHistory({ expr: calculatorData.expr.join(''), result }));
    } catch (error) {
      result = 'Invalid Syntax';
    }

    dispatch(setExpr([result]));
    dispatch(setResult(isNumber(result) ? result : ''));
    dispatch(setEqualled(true));
  };

  const numberHandler = (value: string) => {
    if (calculatorData.equalled || calculatorData.expr.join('') === '0') {
      dispatch(setExpr([value]));
      dispatch(setEqualled(false));
      return;
    }

    dispatch(setExpr([...calculatorData.expr, value]));
  };

  const operatorHandler = (value: string) => {
    const lastElement = calculatorData.expr[calculatorData.expr.length - 1];

    // some cases when you should add operator
    if (
      isNumber(lastElement) ||
      lastElement === '(' ||
      lastElement === ')' ||
      value === '(' ||
      value === ')'
    ) {
      dispatch(setExpr([...calculatorData.expr, value]));
      dispatch(setEqualled(false));
    }
  };

  const functionHandler = (value: string) => {
    const _expr = calculatorData.expr.join('');

    if (calculatorData.equalled && _expr !== '0') {
      dispatch(setExpr([value, ...calculatorData.expr]));
    } else {
      if (_expr === '0') {
        dispatch(setExpr([value]));
      } else {
        setExpr([...calculatorData.expr, value]);
      }
    }

    setEqualled(false);
  };

  const clearHandler = () => {
    dispatch(setExpr(['0']));
    dispatch(setResult('0'));
    setEqualled(false);
  };

  const deleteHandler = () => {
    if (calculatorData.expr.length > 0) {
      let _expr = [...calculatorData.expr];

      if (calculatorData.equalled) {
        let arr = Array.from(_expr.toString());
        arr.pop();
        _expr = [arr.join('')];
      } else {
        _expr.pop();
        if (_expr.length === 0) _expr.push('0');
      }

      dispatch(setExpr(_expr));
      dispatch(setEqualled(false));
    }
  };

  const dotHandler = () => {
    if (calculatorData.expr[calculatorData.expr.length - 1] === '.') {
      return;
    }

    calculatorData.equalled
      ? dispatch(setExpr(['0', '.']))
      : dispatch(setExpr([...calculatorData.expr, '.']));

    dispatch(setEqualled(false));
  };

  const bracketHandler: (value: string) => void = (value) => {
    Platform.OS === 'android' ? ToastAndroid.showWithGravity('Long press for ")"', 1000, 1) : {};
    operatorHandler(value);
  };

  const handlePress = () => {
    switch (buttonType) {
      case 'calculate':
        calculate();
        break;
      case 'clear':
        clearHandler();
        break;
      case 'delete':
        deleteHandler();
        break;
      case 'number':
        numberHandler(buttonText);
        break;
      case 'operator':
        operatorHandler(buttonText);
        break;
      case 'function':
        functionHandler(buttonText);
        break;
      case 'dot':
        dotHandler();
        break;
    }
  };

  const runAnimation: (out: boolean) => void = (out) => {
    opacity.value = out ? withTiming(1) : withTiming(0.6, { duration: 100 });
    borderRadius.value = out ? withTiming(40) : withTiming(25, { duration: 100 });
  };

  // ------------------------- Animated Styles -------------------------

  const rStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      borderRadius: borderRadius.value,
    };
  });

  // ------------------------- Render Functions -------------------------

  return (
    <TouchableWithoutFeedback
      onPress={buttonText === '()' ? () => bracketHandler('(') : handlePress}
      onLongPress={buttonText === '()' ? () => operatorHandler(')') : handlePress}
      onPressIn={() => runAnimation(false)}
      onPressOut={() => runAnimation(true)}
    >
      <Animated.View style={[style, { backgroundColor }, rStyle]}>
        <Text style={{ fontSize: fontSize }}>{buttonText}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default CalcButton;
