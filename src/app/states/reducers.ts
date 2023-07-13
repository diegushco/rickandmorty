import { ActionReducerMap } from '@ngrx/store';

import * as RickMorty from './rickandmorty.reducer';

/**
 * Main model
 */
export const reducers: ActionReducerMap<any> = {
  data: RickMorty.rickandMortyReducer
};
