import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RickAndMortyService } from '../../services/rickandmorty.service';
import { Store } from '@ngrx/store';
import { LoadDimensionsAction } from 'src/app/states/rickandmorty.actions';
import * as fromRickMortySelector from './../../states/rickandmorty.selectors';
import { Observable, of, switchMap } from 'rxjs';
import { IDimension } from '../../services/rickandmorty.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SetDimensionAction } from '../../states/rickandmorty.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dimensions',
  templateUrl: './dimensions.component.html',
  styleUrls: ['./dimensions.component.scss']
})
export class DimensionsComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = [ 'dimension', 'residents', 'type', 'characters'];
  dimensions:IDimension[] = [];

  dataSource: MatTableDataSource<any> =
  new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  
  constructor(private store:Store, private router: Router){}

  ngOnInit(): void {

    this.store.dispatch(new LoadDimensionsAction());

    this.store.select(fromRickMortySelector.getLocations)
    .pipe(
      switchMap((arrResultLocations)=>{
        const results = arrResultLocations?.map((arl)=> arl.results);
        
        const flatArr = results?.flat(2);
       
        flatArr?.forEach((l)=> {
          this.dimensions.push({
            id: l.id,
            dimension: l.dimension,
            residents: l.residents,
            type: l.type
          })
        })
        console.log("dimensions", this.dimensions)
        return of(this.dimensions)
      })
    ).subscribe((dimensions)=>{
      this.dataSource.data = dimensions ?? [];
    });
      //this.rickAndMortyService.getDimensions('https://rickandmortyapi.com/api/location?page=1');
  }

  goCharacters(dimensionSelected:IDimension){
    this.store.dispatch(new SetDimensionAction(dimensionSelected));
    this.router.navigate(['/characters'], { queryParams: { dimension: dimensionSelected.dimension } });
  }

  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
