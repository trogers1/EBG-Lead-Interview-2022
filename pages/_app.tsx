import { useState } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { AppPageProps } from '~/src/common/types';
import theme from '~/src/common/theme';
import '~/styles/globals.css';

interface MyAppProps extends AppProps {
  pageProps: AppPageProps;
}

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps } = props;
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
          </Hydrate>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}
