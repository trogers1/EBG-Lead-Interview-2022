import { rest } from 'msw';
import { fireEvent, waitFor, screen, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithProviders } from '~/src/common/testRender';
import { server } from '~/testServer';
import { BASE_URL, GeneralPostingsDataResponse, JobPostingsOverview } from './index';

describe('Component: JobPostingsOverview', () => {
  test('Displays loading state', async () => {
    const expectedResponse: GeneralPostingsDataResponse = {
      data: {
        totals: {
          median_posting_duration: 100,
          posting_intensity: 100,
          total_postings: 100,
          unique_postings: 100,
        },
      },
    };
    server.use(
      rest.post(`${BASE_URL}/totals`, (_, res, ctx) =>
        res(ctx.delay(1000), ctx.status(200), ctx.json(expectedResponse)),
      ),
    );
    renderWithProviders(<JobPostingsOverview jobSearchTerm="Test Job" token="test-token" />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  test('Displays all data on success', async () => {
    const expectedResponse: GeneralPostingsDataResponse = {
      data: {
        totals: {
          median_posting_duration: 123,
          posting_intensity: 3.4,
          total_postings: 100001,
          unique_postings: 2100000,
        },
      },
    };
    server.use(rest.post(`${BASE_URL}/totals`, (_, res, ctx) => res(ctx.status(200), ctx.json(expectedResponse))));
    renderWithProviders(<JobPostingsOverview jobSearchTerm="Test Job" token="test-token" />);
    await waitForElementToBeRemoved(screen.getByText('Loading...'));

    expect(await screen.findAllByText('2.10M')).toHaveLength(2);
    expect(await screen.findByText('100,001')).toBeInTheDocument();
    expect(await screen.findByText('3 : 1')).toBeInTheDocument();
    expect(await screen.findByText('3-to-1')).toBeInTheDocument();
    expect(await screen.findByText(/meaning that for every\s+3\s+postings there is 1 unique/)).toBeInTheDocument();
    expect(await screen.findByText('123')).toBeInTheDocument();
  });
  test('Displays null data correctly', async () => {
    const expectedResponse: GeneralPostingsDataResponse = {
      data: {
        totals: {
          median_posting_duration: null,
          posting_intensity: null,
          total_postings: null,
          unique_postings: null,
        },
      },
    };
    server.use(rest.post(`${BASE_URL}/totals`, (_, res, ctx) => res(ctx.status(200), ctx.json(expectedResponse))));
    renderWithProviders(<JobPostingsOverview jobSearchTerm="Test Job" token="test-token" />);
    await waitForElementToBeRemoved(screen.getByText('Loading...'));

    expect(await screen.findAllByText(/Unknown/)).toHaveLength(7);
  });
  test('Displays error state', async () => {
    const errorMessage = 'testing api error';
    server.use(
      rest.post(`${BASE_URL}/totals`, (_, res, ctx) => res(ctx.status(500), ctx.json({ error: errorMessage }))),
    );
    renderWithProviders(<JobPostingsOverview jobSearchTerm="Test Job" token="test-token" />);
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument(), { timeout: 10000 }); // retries take a while

    expect(await screen.findByText(RegExp(errorMessage))).toBeInTheDocument();
    expect(screen.queryAllByText('2.10M')).not.toHaveLength(2);
    expect(screen.queryByText('100,001')).not.toBeInTheDocument();
    expect(screen.queryByText('3 : 1')).not.toBeInTheDocument();
    expect(screen.queryByText('3-to-1')).not.toBeInTheDocument();
    expect(screen.queryByText(/meaning that for every\s+3\s+postings there is 1 unique/)).not.toBeInTheDocument();
    expect(screen.queryByText('123')).not.toBeInTheDocument();
  });
});
