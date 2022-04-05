import { HTMLAttributes } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { dynamicNumberFormat } from '~/src/common/utils';

type Props = HTMLAttributes<HTMLDivElement> & {
  total_postings?: number;
  unique_postings?: number;
};

const OverviewBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderTop: '1px solid rgba(111, 111, 111, .3)',
  borderBottom: '1px solid rgba(111, 111, 111, .3)',
  padding: '2rem',
});

const JobPostingsOverview = ({ total_postings, unique_postings, ...props }: Props) => {
  if (!total_postings || !unique_postings) {
    return (
      <Grid container direction="column" justifyContent="space-between" spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2">
            Loading...
          </Typography>
        </Grid>
      </Grid>
    );
  }
  const formattedTotal = dynamicNumberFormat(total_postings);
  const formattedUnique = dynamicNumberFormat(unique_postings);
  const postingIntensity = Math.round(total_postings / unique_postings);
  return (
    <Grid container direction="column" justifyContent="space-between" spacing={1}>
      <Grid item xs={12}>
        <Typography variant="h5" component="h2" fontWeight="500">
          Job Postings Overview
        </Typography>
      </Grid>
      <Grid item container direction="row" justifyContent="space-between" alignItems="center" wrap="nowrap" spacing={0}>
        <Grid item xs={12} sm={4}>
          <OverviewBox>
            <Typography variant="h5" fontWeight="100">
              {formattedUnique}
            </Typography>
            <Typography>Unique Postings</Typography>
          </OverviewBox>
        </Grid>
        <Grid item xs={12} sm={4}>
          <OverviewBox
            sx={{ borderRight: '1px solid rgba(111, 111, 111, .3)', borderLeft: '1px solid rgba(111, 111, 111, .3)' }}
          >
            <Typography variant="h5" fontWeight="100">
              {postingIntensity} : 1
            </Typography>
            <Typography>Posting Intensity</Typography>
          </OverviewBox>
        </Grid>
        <Grid item xs={12} sm={4}>
          <OverviewBox>
            <Typography variant="h5" fontWeight="100">
              {formattedUnique} days
            </Typography>
            <Typography>Median Posting Duration</Typography>
          </OverviewBox>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ color: 'text.secondary' }} component="p">
          There were{' '}
          <Typography component="strong" fontWeight={'bold'}>
            {formattedTotal}
          </Typography>{' '}
          total job postings for your selection, of which{' '}
          <Typography component="strong" fontWeight={'bold'}>
            {formattedUnique}
          </Typography>{' '}
          were unique. These numbers give us a Posting Intensity of{' '}
          <Typography component="strong" fontWeight={'bold'}>
            {postingIntensity}-to-1
          </Typography>
          , meaning that for every {postingIntensity} postings there is 1 unique job posting.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default JobPostingsOverview;
