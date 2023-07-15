import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RickAndMortyService } from '../../services/rickandmorty.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ILocations } from '../../services/rickandmorty.interface';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { LoadLocationsAction } from '../../states/rickandmorty.actions';
import * as fromRickMortySelector from './../../states/rickandmorty.selectors';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { DialogSearchComponent } from '../dialog-search/dialog-search.component';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
})
export class LocationsComponent implements OnInit, AfterViewChecked {
  displayedColumns: string[] = [ 'name', 'type', 'dimension', 'residents', 'characters'];
  dataSource: MatTableDataSource<ILocations> =
    new MatTableDataSource<ILocations>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  filterName: FormControl = new FormControl();
  lengthPaginator = 0;
  indexPage = 0;

  constructor(
    private cdr: ChangeDetectorRef,
    private store: Store,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.store.dispatch(new LoadLocationsAction(1));

    this.store
      .select(fromRickMortySelector.getLocations)
      .subscribe((locations) => {
        const results = locations?.find((lct) => lct.show);
        console.log("results", results)
        this.dataSource.data = results?.results ?? [];
        this.paginator.length = results?.info.count;
        this.lengthPaginator = results?.info.count ?? 0;
        this.indexPage = results?.page ? results?.page - 1 : 0;
        this.cdr.detectChanges();
      });

    this.paginator.page.subscribe((dataPaginator) => {
      let pageTemp = dataPaginator.pageIndex;
      this.store.dispatch(new LoadLocationsAction(pageTemp + 1));
    });
  }

  ngAfterViewChecked(): void {
    if (this.paginator) {
      this.paginator.length = this.lengthPaginator;
      this.paginator.pageIndex = this.indexPage;
      this.cdr.detectChanges();
    }
  }

  search(){
    const dialogRef = this.dialog.open(DialogSearchComponent,
      {
        data: { locationName: this.filterName.value }
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
