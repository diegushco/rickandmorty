import { Action } from "@ngrx/store";

/**
 * Type of actions
 */
export enum RickMortyActionType {
  SetLocations = "[Locations] Set locations of results from api"
}

 export class SetLocationsAction implements Action {

  readonly type = RickMortyActionType.SetLocations;

  /**
   * Constructor
   * @param payload
   */
  constructor(public payload: any) { }
}

/**
 * Export actions
 */
export type Actions =
  | RickMortyActionType
  | SetLocationsAction;
