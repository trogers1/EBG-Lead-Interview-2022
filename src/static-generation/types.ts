export type Country = {
  code: string;
  currencyCodes: string[];
  name: string;
  wikiDataId: string;
};

type GeoLinks = {
  rel: string;
  href: string;
};

export type CountryResponse = {
  data: Country[];
  links: GeoLinks[];
  metadata: {
    currentOffset: number;
    totalCount: number;
  };
};
