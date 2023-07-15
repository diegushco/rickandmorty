import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RickAndMortyService } from '../../services/rickandmorty.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ICharacter } from '../../services/rickandmorty.interface';
import { Store } from '@ngrx/store';
import { LoadCharactersAction } from '../../states/rickandmorty.actions';
import * as fromRickMortySelector from './../../states/rickandmorty.selectors';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent {
  location!: string;
  episode!: string;
  dimension!: string;
  characters$: Observable<ICharacter[]> = new Observable();

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private rickAndMortyService: RickAndMortyService
  ) {}

  ngOnInit(): void {
    this.location = this.route.snapshot.queryParams['location'];
    this.episode = this.route.snapshot.queryParams['episode'];
    this.dimension = this.route.snapshot.queryParams['dimension'];
    console.log('EPA', this.location);
    if (this.location) {
      this.store
        .select(fromRickMortySelector.getLocations)
        .subscribe((locations) => {
          const sites = locations?.find((lct) => lct.show);
          const charactersSelected = sites?.results.find(
            (st) => st.name === this.location
          );
          const characters = charactersSelected?.residents;
          console.log('characters', characters);
          const requests = characters?.map((endpoint) =>
            this.rickAndMortyService.getEndpoint(endpoint)
          );
          if (requests) {
            this.characters$ = forkJoin(requests);
          }
        });
    }else if (this.episode) {
      this.store
        .select(fromRickMortySelector.getEpisodes)
        .subscribe((episodes) => {
          const eps = episodes?.find((ep) => ep.show);
          const charactersSelected = eps?.results.find(
            (ep) => ep.name === this.episode
          );
          const characters = charactersSelected?.characters;
          console.log('characters', characters);
          const requests = characters?.map((endpoint) =>
            this.rickAndMortyService.getEndpoint(endpoint)
          );
          if (requests) {
            this.characters$ = forkJoin(requests);
          }
        });
    }else if (this.dimension) {
      this.store
        .select(fromRickMortySelector.getDimension)
        .subscribe((dimensionSelected) => {
          
          const characters = dimensionSelected?.residents;
          console.log('characters', characters);
          const requests = characters?.map((endpoint) =>
            this.rickAndMortyService.getEndpoint(endpoint)
          );
          if (requests) {
            this.characters$ = forkJoin(requests);
          }
        });
    }
  }


  getStatusStyles(status: string) {
    let backgroundColor: string;

    switch (status) {
      case 'Alive':
        backgroundColor = 'green';
        break;
      case 'Dead':
        backgroundColor = 'gray';
        break;
      case 'unknown':
        backgroundColor = 'black';
        break;
      default:
        backgroundColor = 'transparent';
        break;
    }

    return {
      'background-color': backgroundColor,
    };
  }
}
