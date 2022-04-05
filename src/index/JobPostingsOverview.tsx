import { HTMLAttributes } from 'react';
import { SystemProps } from '@mui/system';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { dynamicNumberFormat } from '~/src/common/utils';
import { useGetGeneralPostingsData } from './queries';

type Props = HTMLAttributes<HTMLDivElement> &
  SystemProps & {
    jobSearchTerm: string;
    token?: string;
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

const JobPostingsOverview = ({ jobSearchTerm, token, ...props }: Props) => {
  const { data: postingsData, error } = useGetGeneralPostingsData(jobSearchTerm, token);

  if (!postingsData) {
    return (
      <Grid container direction="column" justifyContent="space-between" spacing={3} mt="2rem" {...props}>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" fontWeight="500">
            Job Postings Overview
          </Typography>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          wrap="nowrap"
          spacing={0}
        >
          <Grid item xs={12}>
            <Typography variant="h6" component="p" color={error ? 'error' : 'primary'}>
              {error ? `Encountered an error retrieving top postings data: ${error.message}` : 'Loading...'}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container direction="column" justifyContent="space-between" spacing={3} mt="2rem" {...props}>
      <Grid item xs={12}>
        <Typography variant="h5" component="h2" fontWeight="500">
          Job Postings Overview
        </Typography>
      </Grid>
      <Grid item container direction="row" justifyContent="space-between" alignItems="center" wrap="nowrap" spacing={0}>
        <Grid item xs={12} sm={4}>
          <OverviewBox>
            {postingsData.unique_postings ? (
              <Typography variant="h5" fontWeight="100">
                {dynamicNumberFormat(postingsData.unique_postings)}
              </Typography>
            ) : (
              <Typography variant="h5" fontWeight="100" component="i" sx={{ fontStyle: 'italic' }}>
                Unknown
              </Typography>
            )}
            <Typography>Unique Postings</Typography>
          </OverviewBox>
        </Grid>
        <Grid item xs={12} sm={4}>
          <OverviewBox
            sx={{ borderRight: '1px solid rgba(111, 111, 111, .3)', borderLeft: '1px solid rgba(111, 111, 111, .3)' }}
          >
            {postingsData.posting_intensity ? (
              <Typography variant="h5" fontWeight="100">
                {Math.round(postingsData.posting_intensity)} : 1
              </Typography>
            ) : (
              <Typography variant="h5" fontWeight="100" component="i" sx={{ fontStyle: 'italic' }}>
                Unknown
              </Typography>
            )}
            <Typography>Posting Intensity</Typography>
          </OverviewBox>
        </Grid>
        <Grid item xs={12} sm={4}>
          <OverviewBox>
            {postingsData.median_posting_duration ? (
              <Typography variant="h5" fontWeight="100">
                {dynamicNumberFormat(postingsData.median_posting_duration)}
              </Typography>
            ) : (
              <Typography variant="h5" fontWeight="100" component="i" sx={{ fontStyle: 'italic' }}>
                Unknown
              </Typography>
            )}
            <Typography>Median Posting Duration</Typography>
          </OverviewBox>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ color: 'text.secondary' }} component="p">
          There were{' '}
          {postingsData.total_postings ? (
            <Typography component="strong" fontWeight="bold">
              {dynamicNumberFormat(postingsData.total_postings)}
            </Typography>
          ) : (
            <Typography fontWeight="100" component="i" sx={{ fontStyle: 'italic' }}>
              an Unknown number
            </Typography>
          )}{' '}
          total job postings for your selection, of which{' '}
          {postingsData.unique_postings ? (
            <Typography component="strong" fontWeight="bold">
              {dynamicNumberFormat(postingsData.unique_postings)}
            </Typography>
          ) : (
            <Typography fontWeight="100" component="i" sx={{ fontStyle: 'italic' }}>
              an Unknown number
            </Typography>
          )}{' '}
          were unique. These numbers give us a Posting Intensity of{' '}
          {postingsData.posting_intensity ? (
            <Typography component="strong" fontWeight="bold">
              {Math.round(postingsData.posting_intensity)}-to-1
            </Typography>
          ) : (
            <Typography fontWeight="100" component="i" sx={{ fontStyle: 'italic' }}>
              Unknown
            </Typography>
          )}
          , meaning that for every{' '}
          {postingsData.posting_intensity ? Math.round(postingsData.posting_intensity) : 'Unknown'} postings there is 1
          unique job posting.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default JobPostingsOverview;
