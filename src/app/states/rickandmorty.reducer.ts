
import { RickMortyActionType } from "./rickandmorty.actions";
import { IInfo, ILocations } from '../services/rickandmorty.interface';

export interface ILocationManage{
    url:string,
    results:ILocations[],
    show:boolean,
    info:IInfo,
    page:number
}

/**
 * Model state
 */
export interface DataState {
  locations: ILocationManage[] | null;
}

/**
 * initial state
 */
const initialState: DataState = {
  locations: null
};

/**
 * Reducer of actions
 * @param state state for set the action
 * @param action type of action to do
 */
export function rickandMortyReducer(state: DataState = initialState, action: any) {
  switch (action.type) {
    case RickMortyActionType.SetLocations:
      return {
        ...state,
        locations: action.payload,
      };
    
    default:
      return state;
  }
}
