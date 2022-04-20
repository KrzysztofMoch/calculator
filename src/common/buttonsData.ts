import { APP_COLORS } from './colors';

interface Button {
  text: string;
  fontSize: number;
  backgroundColor: string;
  type: buttonType;
}

type buttonType = 'function' | 'number' | 'clear' | 'operator' | 'delete' | 'dot' | 'calculate';

const buttonsData: Button[] = [
  {
    text: 'AC',
    fontSize: 22,
    backgroundColor: APP_COLORS.lightBlue,
    type: 'clear',
  },
  {
    text: '()',
    fontSize: 22,
    backgroundColor: APP_COLORS.veryLightPurple,
    type: 'operator',
  },
  {
    text: '%',
    fontSize: 22,
    backgroundColor: APP_COLORS.veryLightPurple,
    type: 'operator',
  },
  {
    text: '/',
    fontSize: 22,
    backgroundColor: APP_COLORS.veryLightPurple,
    type: 'operator',
  },
  {
    text: '7',
    fontSize: 22,
    backgroundColor: APP_COLORS.lightPurple,
    type: 'number',
  },
  {
    text: '8',
    fontSize: 22,
    backgroundColor: APP_COLORS.lightPurple,
    type: 'number',
  },
  {
    text: '9',
    fontSize: 22,
    backgroundColor: APP_COLORS.lightPurple,
    type: 'number',
  },
  {
    text: 'x',
    fontSize: 22,
    backgroundColor: APP_COLORS.veryLightPurple,
    type: 'operator',
  },
  {
    text: '4',
    fontSize: 22,
    backgroundColor: APP_COLORS.lightPurple,
    type: 'number',
  },
  {
    text: '5',
    fontSize: 22,
    backgroundColor: APP_COLORS.lightPurple,
    type: 'number',
  },
  {
    text: '6',
    fontSize: 22,
    backgroundColor: APP_COLORS.lightPurple,
    type: 'number',
  },
  {
    text: '-',
    fontSize: 22,
    backgroundColor: APP_COLORS.veryLightPurple,
    type: 'operator',
  },
  {
    text: '1',
    fontSize: 22,
    backgroundColor: APP_COLORS.lightPurple,
    type: 'number',
  },
  {
    text: '2',
    fontSize: 22,
    backgroundColor: APP_COLORS.lightPurple,
    type: 'number',
  },
  {
    text: '3',
    fontSize: 22,
    backgroundColor: APP_COLORS.lightPurple,
    type: 'number',
  },
  {
    text: '+',
    fontSize: 22,
    backgroundColor: APP_COLORS.veryLightPurple,
    type: 'operator',
  },
  {
    text: '0',
    fontSize: 22,
    backgroundColor: APP_COLORS.lightPurple,
    type: 'number',
  },
  {
    text: ',',
    fontSize: 22,
    backgroundColor: APP_COLORS.lightPurple,
    type: 'dot',
  },
  {
    text: 'RM',
    fontSize: 22,
    backgroundColor: APP_COLORS.lightPurple,
    type: 'delete',
  },
  {
    text: '=',
    fontSize: 22,
    backgroundColor: APP_COLORS.purple,
    type: 'calculate',
  },
];

const mathFunctionsButtonsData: Button[] = [
  {
    text: '√',
    fontSize: 40,
    backgroundColor: '',
    type: 'function',
  },
  {
    text: '𝝿',
    fontSize: 32,
    backgroundColor: '',
    type: 'number',
  },
  {
    text: '^',
    fontSize: 32,
    backgroundColor: '',
    type: 'function',
  },
  {
    text: '!',
    fontSize: 32,
    backgroundColor: '',
    type: 'operator',
  },
];

const mathFunctionsSubViewButtonsData: Button[] = [
  {
    text: 'RAD',
    fontSize: 22,
    backgroundColor: '',
    type: 'number',
  },
  {
    text: 'sin',
    fontSize: 22,
    backgroundColor: '',
    type: 'function',
  },
  {
    text: 'cos',
    fontSize: 22,
    backgroundColor: '',
    type: 'function',
  },
  {
    text: 'tan',
    fontSize: 22,
    backgroundColor: '',
    type: 'function',
  },
  {
    text: '',
    fontSize: 22,
    backgroundColor: '',
    type: 'function',
  },
  {
    text: 'e',
    fontSize: 22,
    backgroundColor: '',
    type: 'number',
  },
  {
    text: 'In',
    fontSize: 22,
    backgroundColor: '',
    type: 'function',
  },
  {
    text: 'log',
    fontSize: 22,
    backgroundColor: '',
    type: 'function',
  },
];

export { mathFunctionsButtonsData, mathFunctionsSubViewButtonsData };
export type { Button as buttonData, buttonType };
export default buttonsData;
