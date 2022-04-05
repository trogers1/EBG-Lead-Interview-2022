export type GeneralPostingsDataResponse = {
  data: {
    totals: GeneralPostingsData;
  };
};

export type GeneralPostingsData = {
  total_postings: number;
  unique_postings: number;
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
