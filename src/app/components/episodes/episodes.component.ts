import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IEpisode } from '../../services/rickandmorty.interface';
import { Store } from '@ngrx/store';
import { LoadEpisodesAction } from '../../states/rickandmorty.actions';
import * as fromRickMortySelector from './../../states/rickandmorty.selectors';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss'],
})
export class EpisodesComponent implements OnInit, AfterViewChecked {
  displayedColumns: string[] = [ 'name', 'air_date', 'episode', 'characters'];
  dataSource: MatTableDataSource<IEpisode> =
    new MatTableDataSource<IEpisode>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  
  lengthPaginator = 0;
  indexPage = 0;

  constructor(
    private cdr: ChangeDetectorRef,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.store.dispatch(new LoadEpisodesAction(1));

    this.store
      .select(fromRickMortySelector.getEpisodes)
      .subscribe((episodes) => {
        const results = episodes?.find((ep) => ep.show);
        this.dataSource.data = results?.results ?? [];
        this.paginator.length = results?.info.count;
        this.lengthPaginator = results?.info.count ?? 0;
        this.indexPage = results?.page ? results?.page - 1 : 0;
        this.cdr.detectChanges();
      });

    this.paginator.page.subscribe((dataPaginator) => {
      let pageTemp = dataPaginator.pageIndex;
      this.store.dispatch(new LoadEpisodesAction(pageTemp + 1));
    });
  }

  ngAfterViewChecked(): void {
    if (this.paginator) {
      this.paginator.length = this.lengthPaginator;
      this.paginator.pageIndex = this.indexPage;
      this.cdr.detectChanges();
    }
  }
}
