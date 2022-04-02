import { rest } from 'msw';
import { server } from '../../testServer';
import { CountryResponse } from './index';
import { getCountries, BASE_URL } from './queries';

test('Calls api and any next link iteratively', async () => {
  const expectedResponses = [
    {
      data: [{ name: 'Country 1' }, { name: 'Country 2' }],
      links: [{ href: '/v1/2/path', rel: 'next' }],
      metadata: { currentOffset: 0, totalCount: 3 },
    },
    {
      data: [{ name: 'Country 3' }],
      links: [{ href: '/v1/geo/countries', rel: 'prev' }],
      metadata: { currentOffset: 2, totalCount: 3 },
    },
  ];
  server.use(
    rest.get(`${BASE_URL}${'/v1/geo/countries'}`, (_, res, ctx) =>
      res(ctx.status(200), ctx.json(expectedResponses[0])),
    ),
    rest.get(`${BASE_URL}${'/v1/2/path'}`, (_, res, ctx) => res(ctx.status(200), ctx.json(expectedResponses[1]))),
  );

  const actual = await getCountries();
  expect(actual).toStrictEqual([...expectedResponses[0].data, ...expectedResponses[1].data]);
});
test('Delays over 1 second for each call', async () => {
  const expectedResponses = [
    {
      data: [{ name: 'Country 1' }, { name: 'Country 2' }],
      links: [{ href: '/v1/2/path', rel: 'next' }],
      metadata: { currentOffset: 0, totalCount: 3 },
    },
    {
      data: [{ name: 'Country 3' }],
      links: [{ href: '/v1/geo/countries', rel: 'prev' }],
      metadata: { currentOffset: 2, totalCount: 3 },
    },
  ];
  let requestTime1: Date = new Date(0),
    requestTime2: Date = new Date(0);
  server.use(
    rest.get(`${BASE_URL}${'/v1/geo/countries'}`, (_, res, ctx) => {
      requestTime1 = new Date();
      return res(ctx.status(200), ctx.json(expectedResponses[0]));
    }),
    rest.get(`${BASE_URL}${'/v1/2/path'}`, (_, res, ctx) => {
      requestTime2 = new Date();
      return res(ctx.status(200), ctx.json(expectedResponses[1]));
    }),
  );

  await getCountries();
  const elapsedSeconds = (requestTime2.getTime() - requestTime1.getTime()) / 1000;
  console.log({ elapsedSeconds });
  expect(elapsedSeconds).toBeGreaterThan(1);
  expect(elapsedSeconds).toBeLessThan(2);
});
test('Retries a call up to 2 times if they fail', async () => {
  expect(false).toBe(true);
});
test('Throws error when more than 2 retries occur', async () => {
  expect(false).toBe(true);
});
test('Throws error the call fails with a 500', async () => {
  expect(false).toBe(true);
});
