import { useState } from 'react';
import type { NextPage } from 'next';
import { css } from '@emotion/react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FullHeight from '~/src/common/components/FullHeight';
import Link from '~/src/common/components/Link';
import { useGetToken } from '~/src/common/auth';
import { PageHeading, JobPostingsOverview, UniquePostingsTrend, useGetUniquePostingsTrend } from '~/src/index';
import { Grid } from '@mui/material';
// import postingsData from '~/src/index/fakeData';

const Home: NextPage = () => {
  // Fetch the user client-side
  const [jobSearchTerm, setJobSearchTerm] = useState('Software Developers');
  const { data: token, status: tokenStatus, error: tokenError } = useGetToken();

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
  if (!token) {
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

  return (
    <FullHeight>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <PageHeading text={jobSearchTerm} />
          </Grid>
        </Grid>
        <JobPostingsOverview jobSearchTerm={jobSearchTerm} token={token} />
        <UniquePostingsTrend jobSearchTerm={jobSearchTerm} token={token} />
      </Container>
    </FullHeight>
  );
};

export default Home;
