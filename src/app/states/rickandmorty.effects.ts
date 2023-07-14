import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import {
  LoadLocationsAction,
  RickMortyActionType,
  SetEpisodesAction,
  SetLocationsAction,
} from './rickandmorty.actions';
import { of, pipe } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRickMortySelector from './rickandmorty.selectors';
import { RickAndMortyService } from '../services/rickandmorty.service';
import { IEpisodesManage, ILocationManage } from './rickandmorty.reducer';

@Injectable()
export class RickMortyEffects {
  private urlLocations = 'https://rickandmortyapi.com/api/location/?';

  constructor(
    private actions$: Actions,
    private store: Store,
    private rickAndMortyService: RickAndMortyService
  ) {}

  loadLocations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RickMortyActionType.LoadLocations),
      withLatestFrom(this.store.select(fromRickMortySelector.getLocations)),
      switchMap(([action, locations]) => {
        const parametro: any = action;
        let locationsStore = locations || [];
        const pageMatch = `page=${parametro.payload}`;
        let locationShow = locations?.find((lct) =>
          lct.url.includes(pageMatch)
        );
        if (locationShow) {
          locationsStore = locationsStore.map((obj) => {
            if (obj.url === locationShow?.url) {
              return { ...obj, show: true };
            }
            return { ...obj, show: false };
          });
          return of(new SetLocationsAction(locationsStore));
        } else {
          return this.rickAndMortyService.getLocations(parametro.payload).pipe(
            switchMap((result) => {
              locationsStore = locationsStore.map((obj) => {
                return { ...obj, show: false };
              });
              const dataLocation: ILocationManage = {
                results: result.results,
                show: true,
                url: this.urlLocations + pageMatch,
                info: result.info,
                page: parametro.payload,
              };
              const tmpLocation = locationsStore.concat([dataLocation]);
              return of(new SetLocationsAction(tmpLocation));
            })
          );
        }
      })
    )
  );

  loadEpisodes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RickMortyActionType.LoadEpisodes),
      withLatestFrom(this.store.select(fromRickMortySelector.getEpisodes)),
      switchMap(([action, episodes]) => {
        const parametro: any = action;
        let episodesStore = episodes || [];
        const pageMatch = `page=${parametro.payload}`;
        let episodesShow = episodes?.find((ep) =>
          ep.url.includes(pageMatch)
        );
        if (episodesShow) {
          episodesStore = episodesStore.map((obj) => {
            if (obj.url === episodesShow?.url) {
              return { ...obj, show: true };
            }
            return { ...obj, show: false };
          });
          return of(new SetEpisodesAction(episodesStore));
        } else {
          return this.rickAndMortyService.getEpisodes(parametro.payload).pipe(
            switchMap((result) => {
              episodesStore = episodesStore.map((obj) => {
                return { ...obj, show: false };
              });
              const dataLocation: IEpisodesManage = {
                results: result.results,
                show: true,
                url: this.urlLocations + pageMatch,
                info: result.info,
                page: parametro.payload,
              };
              const tmpLocation = episodesStore.concat([dataLocation]);
              return of(new SetEpisodesAction(tmpLocation));
            })
          );
        }
      })
    )
  );
}
