import numeral from 'numeral';

/**
 * This function returns a number formatted to the following rules:
 *
 * If greater than or equal to one million -> X.XXm (million-based decimal)
 * If less than one million -> XXX,XXX (commas added for ease-of-reading, preserving decimals)
 *
 * @param num the number to be formatted.
 * @returns a string representation of the provided number.
 */
export function dynamicNumberFormat(num: number): string {
  if (num / 1000000 >= 1) {
    // eslint-disable-next-line
    return numeral(num).format('0.00a').toUpperCase();
  }
  const strNum = String(num);
  const numDecimalPlaces = strNum.split('.')[1]?.length;

  // eslint-disable-next-line
  return numeral(num).format('0,0' + (numDecimalPlaces ? `.${'0'.repeat(numDecimalPlaces)}` : ''));
}
