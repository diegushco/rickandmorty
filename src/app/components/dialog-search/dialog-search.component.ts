import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { RickAndMortyService } from '../../services/rickandmorty.service';
import { Observable, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-search',
  templateUrl: './dialog-search.component.html',
  styleUrls: ['./dialog-search.component.scss'],
})
export class DialogSearchComponent implements OnInit {
  displayedColumns: string[] = ['name', 'characters'];
  dataSource: any[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { episodeName?: string; locationName?: string },
    private rickAndMortyService: RickAndMortyService,
    private router: Router,
    public dialog: MatDialog
  ) {}
  response$: Observable<any> = new Observable();
  ngOnInit(): void {
    if (this.data.episodeName) {
      this.response$ = this.rickAndMortyService
        .getAllEpisodesByName(this.data.episodeName)
        .pipe(
          switchMap((response) => {
            this.dataSource = response;
            return of(response);
          })
        );
    } else if (this.data.locationName) {
      this.response$ = this.rickAndMortyService
        .getAllLocationsByName(this.data.locationName)
        .pipe(
          switchMap((response) => {
            this.dataSource = response;
            return of(response);
          })
        );
    }
  }

  goCharacters(itemSelected: string) {
    this.dialog.closeAll();
    const obj = this.data.episodeName
      ? { episode: itemSelected }
      : { location: itemSelected };
    this.router.navigate(['/characters'], { queryParams: obj });
  }
}
