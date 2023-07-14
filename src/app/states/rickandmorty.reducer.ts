import { RickMortyActionType } from './rickandmorty.actions';
import { IEpisode, IInfo, ILocations } from '../services/rickandmorty.interface';

export interface ILocationManage {
  url: string;
  results: ILocations[];
  show: boolean;
  info: IInfo;
  page: number;
}

export interface IEpisodesManage {
  url: string;
  results: IEpisode[];
  show: boolean;
  info: IInfo;
  page: number;
}

/**
 * Model state
 */
export interface DataState {
  locations: ILocationManage[] | null;
  episodes: IEpisodesManage[] | null;
}

/**
 * initial state
 */
const initialState: DataState = {
  locations: null,
  episodes: null,
};

/**
 * Reducer of actions
 * @param state state for set the action
 * @param action type of action to do
 */
export function rickandMortyReducer(
  state: DataState = initialState,
  action: any
) {
  switch (action.type) {
    case RickMortyActionType.SetLocations:
      return {
        ...state,
        locations: action.payload,
      };
    case RickMortyActionType.SetEpisodes:
      return {
        ...state,
        episodes: action.payload,
      };
    default:
      return state;
  }
}
