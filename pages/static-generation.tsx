import type { NextPage } from 'next';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '~/src/common/components/Link';
import ProTip from '~/src/index/ProTip';
import Copyright from '~/src/index/Copyright';

import { getCountries, Country } from '~/src/static-generation';

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('countries', getCountries);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const StaticGeneration: NextPage = () => {
  const { data, status } = useQuery<Country[]>('countries', getCountries);
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1">
          Static Generation Example
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          This page uses content that is statically generated--HTML and content are fetched, generated, and pre-rendered
          at <strong>build time</strong>.
        </Typography>
        {status === 'loading' ? (
          <Typography variant="body2" component="p">
            Loading...
          </Typography>
        ) : (
          ''
        )}
        {status === 'error' ? (
          <Typography variant="body1" component="p">
            There was an error loading the Countries. This could be due to the maximum calls to this free API...
          </Typography>
        ) : (
          ''
        )}
        {status === 'success' ? data.map((country) => <div key={country.wikiDataId}>{country.name}</div>) : ''}
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
};

export default StaticGeneration;
