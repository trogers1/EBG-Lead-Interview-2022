import { useState } from 'react';
import type { NextPage } from 'next';
import { css } from '@emotion/react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FullHeight from '~/src/common/components/FullHeight';
import Link from '~/src/common/components/Link';
import { useGetToken } from '~/src/common/auth';
import { useGetPostingsData, PageHeading } from '~/src/index';
import { Grid } from '@mui/material';
// import postingsData from '~/src/index/fakeData';

const Home: NextPage = () => {
  // Fetch the user client-side
  const [jobSearchTerm, setJobSearchTerm] = useState('Software Developers');
  const { data: token, status: tokenStatus, error: tokenError } = useGetToken();
  const { data: postingsData, status: postingsDataStatus } = useGetPostingsData(jobSearchTerm, token);

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
        <Box
          sx={{
            my: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            css={css`
              color: #212b48;
              padding: 32px;
              background-color: hotpink;
              font-size: 24px;
              border-radius: 4px;
              &:hover {
                color: red;
              }
            `}
          >
            MUI v5 + Next.js with TypeScript example {jobSearchTerm}
          </Typography>
          <Link href="/about" color="secondary">
            Go to the about page
          </Link>
        </Box>
      </Container>
    </FullHeight>
  );
};

export default Home;
