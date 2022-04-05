import { useQuery, UseQueryOptions } from 'react-query';
import { RequestError, UnknownJsonBody } from '~/src/common/httpEntities';

export const BASE_URL = 'https://wft-geo-db.p.rapidapi.com';

export type GeneralPostingsDataResponse = {
  data: {
    totals: GeneralPostingsData;
  };
};

export type GeneralPostingsData = {
  total_postings: number;
  unique_postings: number;
};

export const getGeneralPostingsData = async (jobTitle: string, token: string): Promise<GeneralPostingsData> => {
  const response = await fetch('https://emsiservices.com/jpa/totals', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      filter: { when: { start: '2016-09', end: '2021-10' }, title_name: [jobTitle] },
      metrics: ['unique_postings', 'total_postings'],
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
  console.log(JSON.stringify(result, null, 2));

  return result.data.totals;
};

export const useGetGeneralPostingsData = (
  jobTitle: string,
  token: string | undefined,
  options: Omit<UseQueryOptions<GeneralPostingsData, Error>, 'queryKey' | 'queryFn'> = {},
) =>
  // eslint-disable-next-line
  useQuery<GeneralPostingsData, Error>(['postings-data'], () => getGeneralPostingsData(jobTitle, token!), {
    staleTime: Infinity,
    enabled: !!token,
    ...options,
  });
