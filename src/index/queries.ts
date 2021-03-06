import { useQuery, UseQueryOptions } from 'react-query';
import { RequestError, UnknownJsonBody } from '~/src/common/httpEntities';
import {
  GeneralPostingsData,
  GeneralPostingsDataResponse,
  PostingTimeseriesResponse,
  PostingTimeseries,
  TopUniquePostingsRankingsResponse,
  TopUniquePostingsRankings,
  TopPostingsRankingFacet,
} from './types';

export const BASE_URL = 'https://emsiservices.com/jpa/';

const getGeneralPostingsData = async (jobTitle: string, token: string): Promise<GeneralPostingsData> => {
  const response = await fetch(`${BASE_URL}/totals`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      filter: { when: { start: '2016-09', end: '2021-10' }, title_name: [jobTitle] },
      metrics: ['unique_postings', 'total_postings', 'median_posting_duration', 'posting_intensity'],
    }),
  });

  if (!response.ok) {
    const body = (await response.json()) as UnknownJsonBody;
    throw new RequestError(
      Array.isArray(body)
        ? response.status.toString()
        : String(body?.error) || String(body?.message) || response.status.toString(),
      {
        status: response.status,
        body,
      },
    );
  }

  const result = (await response.json()) as GeneralPostingsDataResponse;

  return result.data.totals;
};

export const useGetGeneralPostingsData = (
  jobTitle: string,
  token: string | undefined,
  options: Omit<UseQueryOptions<GeneralPostingsData, Error>, 'queryKey' | 'queryFn'> = {},
) =>
  // eslint-disable-next-line
  useQuery<GeneralPostingsData, Error>(
    ['postings-data-general', jobTitle],
    // eslint-disable-next-line
    () => getGeneralPostingsData(jobTitle, token!),
    {
      staleTime: Infinity,
      enabled: !!token,
      ...options,
    },
  );

const getUniquePostingsTrend = async (date: Date, jobTitle: string, token: string): Promise<PostingTimeseries> => {
  const startDate = new Date(date);
  startDate.setDate(date.getDate() - 30);
  const response = await fetch(`${BASE_URL}/timeseries`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      filter: {
        when: {
          start: startDate.toISOString().split('T')[0],
          end: date.toISOString().split('T')[0],
        },
        title_name: [jobTitle],
      },
      metrics: ['unique_postings'],
    }),
  });

  if (!response.ok) {
    const body = (await response.json()) as UnknownJsonBody;
    throw new RequestError(
      Array.isArray(body)
        ? response.status.toString()
        : String(body?.error) || String(body?.message) || response.status.toString(),
      {
        status: response.status,
        body,
      },
    );
  }

  const result = (await response.json()) as PostingTimeseriesResponse;

  return result.data;
};

export const useGetUniquePostingsTrend = (
  date: Date,
  jobTitle: string,
  token: string | undefined,
  options: Omit<UseQueryOptions<PostingTimeseries, Error>, 'queryKey' | 'queryFn'> = {},
) =>
  useQuery<PostingTimeseries, Error>(
    ['postings-data-timeseries', `${date.toISOString().split('T')[0]}`, jobTitle],
    // eslint-disable-next-line
    () => getUniquePostingsTrend(date, jobTitle, token!),
    {
      staleTime: Infinity,
      enabled: !!token,
      ...options,
    },
  );

const getTopPostingsRanking = async (
  jobTitle: string,
  rankingFacet: TopPostingsRankingFacet,
  token: string,
): Promise<TopUniquePostingsRankings> => {
  const response = await fetch(`${BASE_URL}/rankings/${rankingFacet}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      filter: {
        when: {
          start: '2016-09',
          end: '2021-10',
        },
        title_name: [jobTitle],
      },
      rank: {
        by: 'unique_postings',
        limit: 11,
        extra_metrics: ['posting_intensity', 'total_postings', 'median_posting_duration'],
      },
    }),
  });

  if (!response.ok) {
    const body = (await response.json()) as UnknownJsonBody;
    throw new RequestError(
      Array.isArray(body)
        ? response.status.toString()
        : String(body?.error) || String(body?.message) || response.status.toString(),
      {
        status: response.status,
        body,
      },
    );
  }

  const result = (await response.json()) as TopUniquePostingsRankingsResponse;

  return {
    ranking: result.data.ranking.buckets.filter(
      (item) => item.name !== 'Unclassified' && item.name !== '[Unknown city]',
    ),
    totals: result.data.totals,
  };
};

export const useGetTopPostingsRanking = (
  jobTitle: string,
  rankingFacet: TopPostingsRankingFacet,
  token: string | undefined,
  options: Omit<UseQueryOptions<TopUniquePostingsRankings, Error>, 'queryKey' | 'queryFn'> = {},
) =>
  useQuery<TopUniquePostingsRankings, Error>(
    ['postings-data-top-companies', jobTitle, rankingFacet],
    // eslint-disable-next-line
    () => getTopPostingsRanking(jobTitle, rankingFacet, token!),
    {
      staleTime: Infinity,
      enabled: !!token,
      ...options,
    },
  );
