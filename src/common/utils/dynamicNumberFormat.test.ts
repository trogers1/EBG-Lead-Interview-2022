import { dynamicNumberFormat } from './dynamicNumberFormat';

describe('dynamicNumberFormat', () => {
  test('Correctly formats million number without decimals', () => {
    expect(dynamicNumberFormat(10000000)).toEqual('10.00M');
  });
  test('Correctly formats million number with decimals', () => {
    expect(dynamicNumberFormat(1280000)).toEqual('1.28M');
  });
  test('Correctly formats hundred-thousand number without decimals', () => {
    expect(dynamicNumberFormat(100000)).toEqual('100,000');
    expect(dynamicNumberFormat(9000)).toEqual('9,000');
  });
  test('Correctly formats hundred-thousand number with decimals', () => {
    expect(dynamicNumberFormat(234567.89)).toEqual('234,567.89');
    expect(dynamicNumberFormat(234567.001)).toEqual('234,567.001');
  });
  test('Correctly formats a simple string version of numbers less than 1,000', () => {
    expect(dynamicNumberFormat(100)).toEqual('100');
    expect(dynamicNumberFormat(8.001)).toEqual('8.001');
  });
});
