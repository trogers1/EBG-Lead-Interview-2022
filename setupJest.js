// adds the 'fetchMock' global variable and rewires 'fetch' global to call 'fetchMock' instead of the real implementation
require('jest-fetch-mock').enableMocks();
// changes default behavior of fetchMock to use the real 'fetch' implementation and not mock responses
fetchMock.dontMock();
import { QueryClient, setLogger } from 'react-query';
import { configure } from '@testing-library/react';
import { server } from './testServer';

// Increase timeout and configure testing library to improve getByRole query performance.
// More info: https://github.com/testing-library/dom-testing-library/issues/552
// TL;DR: getByRole is a bottleneck. Try to use other methods until it is resolved.
configure({ defaultHidden: true });
jest.setTimeout(20000);

setLogger({
  log: () => {},
  warn: () => {},
  error: () => {},
});

const queryClient = new QueryClient();

beforeAll(() => server.listen());
afterEach(() => {
  queryClient.clear();
  server.resetHandlers();
});
afterAll(() => server.close());
