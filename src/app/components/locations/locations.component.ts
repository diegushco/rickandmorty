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

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
})
export class LocationsComponent implements OnInit, AfterViewChecked {
  displayedColumns: string[] = ['id', 'name'];
  dataSource: MatTableDataSource<ILocations> =
    new MatTableDataSource<ILocations>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  private pageSubscription!: Subscription;

  lengthPaginator = 0;
  indexPage = 0;

  constructor(
    private rickyAndMortyService: RickAndMortyService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.loadData();
  }

  loadData(): void {
    this.rickyAndMortyService.getLocations().subscribe((data) => {
      this.dataSource.data = data.results;
      this.paginator.length = data.info.count;
      this.lengthPaginator = data.info.count;
      this.indexPage = 0;
    });

    this.paginator.page.subscribe((dataPaginator) => {
      let pageTemp = dataPaginator.pageIndex;

      this.rickyAndMortyService.getLocations(pageTemp + 1).subscribe((data) => {
        this.dataSource.data = data.results;
        this.paginator.length = data.info.count;
        this.lengthPaginator = data.info.count;
        this.indexPage = pageTemp;
      });
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
