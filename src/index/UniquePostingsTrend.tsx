import { HTMLAttributes, useMemo } from 'react';
import numeral from 'numeral';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ResponsiveContainer, CartesianGrid, LineChart, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import { primary } from '~/src/common/theme';
import { PostingTimeseries, TimeseriesLineChartData, TimeseriesLineChartDataPoint } from './types';

type Props = HTMLAttributes<HTMLDivElement> & {
  currTrendData?: PostingTimeseries;
  prevTrendData?: PostingTimeseries;
};

export const transformTrendData = (
  rawCurrTrendData?: PostingTimeseries,
  rawPrevTrendData?: PostingTimeseries,
): TimeseriesLineChartData => {
  const trendData: TimeseriesLineChartData = [];
  const dateFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });
  const transform = (dataset: PostingTimeseries, timePeriod: 'current' | 'previous') => {
    for (let i = 0; i < dataset.timeseries.day.length; i++) {
      // new Date() assumes ISO with London timezone if you leave the dashes and don't have a timezone specified.
      // Otherwise, if the separator is not a dash, it uses local time. So we replace the dashes. See: https://stackoverflow.com/a/31732581
      const day = dataset.timeseries.day[i].replace(/-/g, '/'),
        data = dataset.timeseries.unique_postings[i];
      const dayFormatted = dateFormatter.format(new Date(day));
      const extantDayIndex = trendData.findIndex((data) => data.name === dayFormatted);
      if (extantDayIndex !== -1) {
        trendData[extantDayIndex][timePeriod] = data;
        continue;
      }
      trendData.push({ name: dayFormatted, [timePeriod]: data });
    }
  };
  if (rawCurrTrendData) {
    transform(rawCurrTrendData, 'current');
  }
  if (rawPrevTrendData) {
    transform(rawPrevTrendData, 'previous');
  }

  return trendData;
};

const UniquePostingsTrend = ({ currTrendData, prevTrendData, ...props }: Props) => {
  const chartData: TimeseriesLineChartData = useMemo(
    () => transformTrendData(currTrendData, prevTrendData),
    [currTrendData, prevTrendData],
  );
  console.log(JSON.stringify(chartData, null, 2));
  return (
    <Grid container direction="column" justifyContent="space-between" spacing={3} mt="2rem">
      <Grid item xs={12}>
        <Typography variant="h5" component="h2" fontWeight="500">
          Unique Postings Trend
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" component="p">
          This view displays the most recent 30 days of job postings activity to show near-term trends.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              tickFormatter={(value) => numeral(value).format('0.0a').toUpperCase()}
              domain={[(dataMin: number) => dataMin - 0.5 * dataMin, (dataMax: number) => dataMax + 0.5 * dataMax]}
            />
            <Tooltip />
            <Legend />
            {currTrendData ? (
              <Line name={`${new Date().getFullYear()} trends`} type="monotone" dataKey="current" stroke={primary} />
            ) : (
              ''
            )}
            {prevTrendData ? (
              <Line
                name={`${new Date().getFullYear() - 1} trends`}
                type="monotone"
                dataKey="previous"
                stroke="#4B84CD"
              />
            ) : (
              ''
            )}
          </LineChart>
        </ResponsiveContainer>
      </Grid>
    </Grid>
  );
};

export default UniquePostingsTrend;
