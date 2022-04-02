import { Country, CountryResponse } from '~/src/static-generation/types';

export const BASE_URL = 'https://wft-geo-db.p.rapidapi.com';

export const getCountries = async (): Promise<Country[]> => {
  let nextPath: string | undefined = '/v1/geo/countries?limit=10';
  let countries: Country[] = [];
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
      'X-RapidAPI-Key': 'fab89af69emshff0d1866f319c42p14f70cjsnae4090c13af0',
    },
  };

  const delay = (milliseconds: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  };

  while (nextPath) {
    const response = await fetch(`${BASE_URL}${nextPath}`, options);
    if (!response.ok) {
      throw Error(response.status.toString());
    }

    const data = (await response.json()) as CountryResponse;
    console.log({ data });
    countries = [...countries, ...data.data];
    nextPath = data.links.find((item) => item.rel === 'next')?.href;
    await delay(1100); // Wait just a bit over 1 second, to be sure.
  }

  return countries;
};
