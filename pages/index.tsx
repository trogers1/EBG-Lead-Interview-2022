import { useState } from 'react';
import type { NextPage } from 'next';
import { css } from '@emotion/react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FullHeight from '~/src/common/components/FullHeight';
import Link from '~/src/common/components/Link';
import { useGetToken } from '~/src/common/auth';
import {
  PageHeading,
  JobPostingsOverview,
  UniquePostingsTrend,
  useGetGeneralPostingsData,
  useGetUniquePostingsTrend,
} from '~/src/index';
import { Grid } from '@mui/material';
// import postingsData from '~/src/index/fakeData';

const Home: NextPage = () => {
  // Fetch the user client-side
  const [jobSearchTerm, setJobSearchTerm] = useState('Software Developers');
  const [today, _] = useState(new Date());
  const [thisDateLastYear, __] = useState(() => {
    const date = new Date();
    const lastYear = date.getFullYear() - 1;
    date.setFullYear(lastYear);
    return date;
  });
  const { data: token, status: tokenStatus, error: tokenError } = useGetToken();
  const { data: postingsData, status: postingsDataStatus } = useGetGeneralPostingsData(jobSearchTerm, token);
  const { data: currTrendData, status: currTrendDataStatus } = useGetUniquePostingsTrend(today, jobSearchTerm, token);
  const { data: prevTrendData, status: prevTrendDataStatus } = useGetUniquePostingsTrend(
    thisDateLastYear,
    jobSearchTerm,
    token,
  );

  if (tokenStatus === 'error') {
    return (
      <FullHeight>
        <Container maxWidth="lg">
          <Typography color="red" variant="h1" component="h1">
            There was an error retrieving your token: {tokenError.message}
          </Typography>
        </Container>
      </FullHeight>
    );
  }
  if (!token || postingsDataStatus === 'loading') {
    return (
      <FullHeight>
        <Container maxWidth="lg">
          <Typography variant="h1" component="h1">
            Loading...
          </Typography>
        </Container>
      </FullHeight>
    );
  }
  console.log(JSON.stringify(postingsData, null, 2));

  return (
    <FullHeight>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <PageHeading text={jobSearchTerm} />
          </Grid>
        </Grid>
        <JobPostingsOverview
          unique_postings={postingsData?.unique_postings}
          total_postings={postingsData?.total_postings}
        />
        <UniquePostingsTrend currTrendData={currTrendData} prevTrendData={prevTrendData} />
      </Container>
    </FullHeight>
  );
};

export default Home;
