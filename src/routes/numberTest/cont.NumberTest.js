import React from 'react';
import NumberTest from './comp.NumberTest';
import { getAllNumbersData } from 'app/data/numbers';
import { createNumberTest } from 'app/utils/testMaker';

export default function NumberTestContainer() {
  return <NumberTest numberDataList={createNumberTest(10, getAllNumbersData())} />;
}
