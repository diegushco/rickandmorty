interface IInfo {
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

export interface IDataLocation {
  info: IInfo;
  results: ILocations[];
}
