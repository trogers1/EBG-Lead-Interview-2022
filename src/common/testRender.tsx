import { ReactElement } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render } from '@testing-library/react';
import theme from '~/src/common/theme';

export const renderWithProviders = (node: ReactElement) => {
  const queryClient = new QueryClient();
  const Wrapper = ({ children }: any) => (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </QueryClientProvider>
  );

  return {
    ...render(node, { wrapper: Wrapper }),
  };
};
