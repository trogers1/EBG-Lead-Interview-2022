import { useQuery, UseQueryOptions } from 'react-query';
import { RequestError, UnknownJsonBody } from '~/src/common/httpEntities';
import { AuthResponse } from './index';

const getToken = async (): Promise<string> => {
  const formData = {
    client_id: String(process.env.NEXT_PUBLIC_CLIENT_ID),
    client_secret: String(process.env.NEXT_PUBLIC_CLIENT_SECRET),
    grant_type: 'client_credentials',
    scope: 'postings:us',
  };
  const formBody: string[] = [];
  for (const [key, value] of Object.entries(formData)) {
    formBody.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
  }
  const response = await fetch('https://auth.emsicloud.com/connect/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formBody.join('&'),
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

  const data = (await response.json()) as AuthResponse;
  return data.access_token;
};

const STALE_TIME = 59 * 60 * 1000; // 59 min -> milliseconds

export const useGetToken = (options: Omit<UseQueryOptions<string, Error>, 'queryKey' | 'queryFn'> = {}) =>
  useQuery<string, Error>('auth-token', getToken, { staleTime: STALE_TIME, ...options });
