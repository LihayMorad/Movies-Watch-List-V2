export interface OMDBMovie {
  imdbRating: string;
  imdbVotes: string;
  Plot: string;
}

export interface TrendingMovie {
  backdrop_path: string;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
}

export interface Movie extends TrendingMovie, OMDBMovie {
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  imdb_id: string;
  origin_country: string[];
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  revenue: number;
  runtime: number;
  status: string;
  similar: {
    results: TrendingMovie[];
  };
  videos: {
    results: {
      name: string;
      key: string;
      site: string;
      type: string;
      official: boolean;
    }[];
  };
  credits: {
    cast: {
      id: number;
      name: string;
      profile_path: string;
    }[];
  };
}
