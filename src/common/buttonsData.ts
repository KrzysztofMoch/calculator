import { APP_COLORS } from './colors';

interface buttonData {
  text: string;
  fontSize: number;
  backgroundColor: string;
}

const buttonsData: buttonData[] = [
  {
    text: 'AC',
    fontSize: 22,
    backgroundColor: APP_COLORS.lightBlue,
  },
  {
    text: '()',
    fontSize: 22,
    backgroundColor: APP_COLORS.veryLightPurple,
  },
  {
    text: '%',
    fontSize: 22,
    backgroundColor: APP_COLORS.veryLightPurple,
  },
  {
    text: '/',
    fontSize: 22,
    backgroundColor: APP_COLORS.veryLightPurple,
  },
  {
    text: '7',
    fontSize: 22,
    backgroundColor: APP_COLORS.lightPurple,
  },
  {
    text: '8',
    fontSize: 22,
    backgroundColor: APP_COLORS.lightPurple,
  },
  {
    text: '9',
    fontSize: 22,
    backgroundColor: APP_COLORS.lightPurple,
  },
  {
    text: 'x',
    fontSize: 22,
    backgroundColor: APP_COLORS.veryLightPurple,
  },
  {
    text: '4',
    fontSize: 22,
    backgroundColor: APP_COLORS.lightPurple,
  },
  {
    text: '5',
    fontSize: 22,
    backgroundColor: APP_COLORS.lightPurple,
  },
  {
    text: '6',
    fontSize: 22,
    backgroundColor: APP_COLORS.lightPurple,
  },
  {
    text: '-',
    fontSize: 22,
    backgroundColor: APP_COLORS.veryLightPurple,
  },
  {
    text: '1',
    fontSize: 22,
    backgroundColor: APP_COLORS.lightPurple,
  },
  {
    text: '2',
    fontSize: 22,
    backgroundColor: APP_COLORS.lightPurple,
  },
  {
    text: '3',
    fontSize: 22,
    backgroundColor: APP_COLORS.lightPurple,
  },
  {
    text: '+',
    fontSize: 22,
    backgroundColor: APP_COLORS.veryLightPurple,
  },
  {
    text: '0',
    fontSize: 22,
    backgroundColor: APP_COLORS.lightPurple,
  },
  {
    text: ',',
    fontSize: 22,
    backgroundColor: APP_COLORS.lightPurple,
  },
  {
    text: 'RM',
    fontSize: 22,
    backgroundColor: APP_COLORS.lightPurple,
  },
  {
    text: '=',
    fontSize: 22,
    backgroundColor: APP_COLORS.purple,
  },
];

export type { buttonData };
export default buttonsData;
