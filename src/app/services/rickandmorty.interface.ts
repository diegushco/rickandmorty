export interface IInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface ILocations {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface IDataLocation {
  info: IInfo;
  results: ILocations[];
}

export interface IDataCharacters {
  info: IInfo;
  results: ICharacter[];
}

export interface IEpisode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface IDataEpisodes {
  info: IInfo;
  results: IEpisode[];
}

export interface IDimension {
  id:number,
  dimension: string;
  residents: string[];
  type: string;
}
