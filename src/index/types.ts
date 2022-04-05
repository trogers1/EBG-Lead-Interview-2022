export type GeneralPostingsDataResponse = {
  data: {
    totals: GeneralPostingsData;
  };
};

export type GeneralPostingsData = {
  median_posting_duration: number | null;
  posting_intensity: number | null;
  total_postings: number | null;
  unique_postings: number | null;
};

export type PostingTimeseries = {
  timeseries: {
    day: string[];
    unique_postings: number[];
  };
  totals: { unique_postings: number };
};

export type PostingTimeseriesResponse = {
  data: PostingTimeseries;
};

export type TimeseriesLineChartDataPoint = {
  name: string;
  current?: number;
  previous?: number;
};

export type TimeseriesLineChartData = Array<TimeseriesLineChartDataPoint>;

export type TopPostingsRankingFacet = 'company_name' | 'city_name';

export type SingleUniquePostingRankingData = {
  median_posting_duration: number | null;
  name: string;
  posting_intensity: number | null;
  total_postings: number | null;
  unique_postings: number | null;
};

type TopUniquePostingRankingTotals = {
  median_posting_duration: number | null;
  posting_intensity: number | null;
  total_postings: number | null;
  unique_postings: number | null;
};

export type TopUniquePostingsRankingsResponse = {
  data: {
    ranking: {
      buckets: SingleUniquePostingRankingData[];
      facet: TopPostingsRankingFacet;
      limit: 10;
      rank_by: 'unique_postings';
    };
    totals: TopUniquePostingRankingTotals;
  };
};

export type TopUniquePostingsRankings = {
  ranking: SingleUniquePostingRankingData[];
  totals: TopUniquePostingRankingTotals;
};
