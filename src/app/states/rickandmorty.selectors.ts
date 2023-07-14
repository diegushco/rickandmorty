import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DataState } from "./rickandmorty.reducer";

/**
 * Creating selector data
 */
const getRickMortyState = createFeatureSelector<DataState>("data");

/**
 * Creating selector for location
 */
export const getLocations = createSelector(
    getRickMortyState,
  (state) => state.locations
);

/**
 * Creating selector for episodes
 */
export const getEpisodes = createSelector(
    getRickMortyState,
  (state) => state.episodes
);

