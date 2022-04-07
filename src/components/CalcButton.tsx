import React from 'react';
import { StyleProp, Text, ToastAndroid, TouchableWithoutFeedback, ViewStyle } from 'react-native';
import { buttonData } from '../common/buttonsData';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { all, create } from 'mathjs';
import { useDispatch, useSelector } from 'react-redux';
import { setEqualled, setExpr, setResult } from '../redux/calculatorSlice';
import { RootReducer } from '../redux/store';

interface CalcButtonProps {
  data: buttonData;
  style: StyleProp<ViewStyle>;
}

const Mathjs = create(all);

const ln = (num: number) => Math.log(num);
ln.transform = (num: number) => ln(num);
Mathjs.import({ ln: ln }, {});

const CalcButton: React.FC<CalcButtonProps> = ({ data, style }) => {
  const borderRadius = useSharedValue<number>(40);
  const opacity = useSharedValue<number>(1);

  // ------------------------- Utilities -------------------------

  const calculatorData = useSelector((state: RootReducer) => state.calculator);
  const dispatch = useDispatch();

  const convertSymbols: (value: string) => string = (value) => {
    let newValue = value.replace('x', '*');
    newValue = newValue.replace('𝝿', '(22/7)');
    return newValue;
  };

  // ------------------------- Handlers -------------------------

  const calculate = () => {
    let res = calculatorData.result;
    let exprString = calculatorData.expr.join('');

    // ---- brackets fix ----

    let leftBracketCount = exprString.match(/\(/g)?.length;
    let rightBracketCount = exprString.match(/\)/g)?.length;

    if (leftBracketCount !== rightBracketCount) {
      if (!leftBracketCount) {
        return;
      }

      rightBracketCount = rightBracketCount ? rightBracketCount : 0;

      while (leftBracketCount > rightBracketCount) {
        exprString += ')';
        rightBracketCount += 1;
      }
    }

    // ---- try calculate string ----

    try {
      res = Mathjs.evaluate(convertSymbols(exprString)).toString();
    } catch (error) {
      res = 'Invalid Syntax';
    }

    // ---- check if have good result ----

    !isNaN(parseFloat(res)) ? dispatch(setExpr([res])) : dispatch(setExpr(['0']));

    dispatch(setResult(res));
    dispatch(setEqualled(true));
  };

  const numberHandler = (value: string) => {
    if (calculatorData.equalled) {
      dispatch(setExpr([value]));
      dispatch(setEqualled(false));
      return;
    }

    // check if calc string is only "0"
    if (calculatorData.expr.join() === '0') {
      dispatch(setExpr([value]));
    } else {
      dispatch(setExpr([...calculatorData.expr, value]));
    }
  };

  const operatorHandler = (value: string) => {
    const lastElement = calculatorData.expr[calculatorData.expr.length - 1];

    // some cases when you should add operator
    if (
      !isNaN(Number(lastElement)) ||
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
    // add fun( + equalled value + )

    if (calculatorData.equalled) {
      dispatch(setExpr([value, ...calculatorData.expr, ')']));
    } else {
      if (calculatorData.expr.join('') === '0') {
        dispatch(setExpr([value]));
      } else {
        let last = [...calculatorData.expr].pop();
        if (last) {
          if (isNaN(parseFloat(last))) {
            dispatch(setExpr([...calculatorData.expr, value]));
          } else {
            dispatch(setExpr([...calculatorData.expr, 'x', value]));
          }
        }
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
    }
  };

  const dotHandler = () => {
    if (calculatorData.equalled) {
      dispatch(setExpr(['0', '.']));
    } else {
      let index = calculatorData.expr.lastIndexOf('.');
      if (index > -1) {
        let num = calculatorData.expr.slice(index).join('');
        if (isNaN(parseFloat(num))) {
          dispatch(setExpr([...calculatorData.expr, '.']));
        }
      } else {
        dispatch(setExpr([...calculatorData.expr, '.']));
      }
      console.log(index);
    }
    dispatch(setEqualled(false));
  };

  const bracketHandler: (value: string) => void = (value) => {
    ToastAndroid.showWithGravity('Long press for ")"', 1000, 1);
    operatorHandler(value);
  };

  const handlePress = () => {
    switch (data.type) {
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
        numberHandler(data.text);
        break;
      case 'operator':
        operatorHandler(data.text);
        break;
      case 'function':
        functionHandler(data.text);
        break;
      case 'dot':
        dotHandler();
        break;
    }
  };

  const handlePressAnimation: (out: boolean) => void = (out) => {
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
      onPress={data.text === '()' ? () => bracketHandler('(') : () => handlePress()}
      onLongPress={data.text === '()' ? () => operatorHandler(')') : () => {}}
      onPressIn={() => handlePressAnimation(false)}
      onPressOut={() => handlePressAnimation(true)}
    >
      <Animated.View style={[style, { backgroundColor: data.backgroundColor }, rStyle]}>
        <Text style={{ fontSize: data.fontSize }}>{data.text}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default CalcButton;
