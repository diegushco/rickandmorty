import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DataState } from "./rickandmorty.reducer";

/**
 * Creando selector de admin
 */
const getRickMortyState = createFeatureSelector<DataState>("data");

/**
 * Para obtener el estado del admin
 */
export const getLocations = createSelector(
    getRickMortyState,
  (state) => state.locations
);
