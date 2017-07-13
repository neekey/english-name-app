import numbers from 'app/configs/numbers.json';
import { getVoiceURLForNumber } from 'app/utils/voice';

const ALL_NUMBER_DATA = numbers.map(number => (
  {
    number,
    url: getVoiceURLForNumber(number),
  }
));

export function getAllNumbersData() {
  return ALL_NUMBER_DATA;
}

