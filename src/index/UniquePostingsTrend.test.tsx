import { transformTrendData } from './UniquePostingsTrend';
import { PostingTimeseries } from './types';

describe('transformTrendData', () => {
  test('Returns empty array when both args are undefined', () => {
    expect(transformTrendData()).toStrictEqual([]);
  });
  test('Returns correct data when only one arg is defined', () => {
    const exampleCurrentData: PostingTimeseries = {
      timeseries: {
        day: ['2022-01-01', '2022-01-02', '2022-01-03', '2022-01-04', '2022-01-05', '2022-01-06'],
        unique_postings: [1, 2, 3, 4, 5, 6],
      },
      totals: { unique_postings: 10 },
    };
    const examplePrevData: PostingTimeseries = {
      timeseries: {
        day: ['2021-01-01', '2021-01-02', '2021-01-03', '2021-01-04', '2021-01-05', '2021-01-06'],
        unique_postings: [2, 4, 6, 8, 10, 12],
      },
      totals: { unique_postings: 10 },
    };
    const expectedResult1 = [
      { name: 'Jan 1', current: 1 },
      { name: 'Jan 2', current: 2 },
      { name: 'Jan 3', current: 3 },
      { name: 'Jan 4', current: 4 },
      { name: 'Jan 5', current: 5 },
      { name: 'Jan 6', current: 6 },
    ];
    const expectedResult2 = [
      { name: 'Jan 1', previous: 2 },
      { name: 'Jan 2', previous: 4 },
      { name: 'Jan 3', previous: 6 },
      { name: 'Jan 4', previous: 8 },
      { name: 'Jan 5', previous: 10 },
      { name: 'Jan 6', previous: 12 },
    ];
    expect(transformTrendData(exampleCurrentData, undefined)).toStrictEqual(expectedResult1);
    expect(transformTrendData(undefined, examplePrevData)).toStrictEqual(expectedResult2);
  });
  test('Returns correct data when both are defined', () => {
    const exampleCurrentData: PostingTimeseries = {
      timeseries: {
        day: ['2022-01-01', '2022-01-02', '2022-01-03', '2022-01-04', '2022-01-05', '2022-01-06'],
        unique_postings: [1, 2, 3, 4, 5, 6],
      },
      totals: { unique_postings: 10 },
    };
    const examplePrevData: PostingTimeseries = {
      timeseries: {
        day: ['2021-01-01', '2021-01-02', '2021-01-03', '2021-01-04', '2021-01-05', '2021-01-06'],
        unique_postings: [2, 4, 6, 8, 10, 12],
      },
      totals: { unique_postings: 10 },
    };
    const expectedResult = [
      { name: 'Jan 1', current: 1, previous: 2 },
      { name: 'Jan 2', current: 2, previous: 4 },
      { name: 'Jan 3', current: 3, previous: 6 },
      { name: 'Jan 4', current: 4, previous: 8 },
      { name: 'Jan 5', current: 5, previous: 10 },
      { name: 'Jan 6', current: 6, previous: 12 },
    ];
    expect(transformTrendData(exampleCurrentData, examplePrevData)).toStrictEqual(expectedResult);
  });
});
