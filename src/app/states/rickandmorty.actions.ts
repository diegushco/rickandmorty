import { Action } from '@ngrx/store';

/**
 * Type of actions
 */
export enum RickMortyActionType {
  SetLocations = '[Locations] Set locations of results from api',
  LoadLocations = '[Locations] Load data',
  LoadCharacters = '[Characters] Load data',
  SetEpisodes = '[Episodes] Set episode of results from api',
  LoadEpisodes = '[Episodes] Load data',
  LoadDimensions = '[Dimensions] Load data',
  SetDimension = '[Dimensions] Set dimension selected',
}

export class SetLocationsAction implements Action {
  readonly type = RickMortyActionType.SetLocations;

  /**
   * Constructor
   * @param payload
   */
  constructor(public payload: any) {}
}

export class LoadLocationsAction implements Action {
  readonly type = RickMortyActionType.LoadLocations;

  /**
   * Constructor
   * @param payload
   */
  constructor(public payload: number) {}
}

export class LoadCharactersAction implements Action {
  readonly type = RickMortyActionType.LoadCharacters;

  /**
   * Constructor
   * @param payload
   */
  constructor(public payload: number) {}
}

export class SetEpisodesAction implements Action {
  readonly type = RickMortyActionType.SetEpisodes;

  /**
   * Constructor
   * @param payload
   */
  constructor(public payload: any) {}
}

export class LoadEpisodesAction implements Action {
  readonly type = RickMortyActionType.LoadEpisodes;

  /**
   * Constructor
   * @param payload
   */
  constructor(public payload: number) {}
}

export class LoadDimensionsAction implements Action {
  readonly type = RickMortyActionType.LoadDimensions;

  /**
   * Constructor
   * @param payload
   */
  constructor() {}
}

export class SetDimensionAction implements Action {
  readonly type = RickMortyActionType.SetDimension;

  /**
   * Constructor
   * @param payload
   */
  constructor(public payload: any) {}
}

/**
 * Export actions
 */
export type Actions =
  | RickMortyActionType
  | SetLocationsAction
  | LoadCharactersAction
  | SetEpisodesAction
  | LoadEpisodesAction
  | LoadDimensionsAction
  | SetDimensionAction;
