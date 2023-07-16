import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { EpisodesComponent } from './episodes.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RickAndMortyService } from '../../services/rickandmorty.service';
import { Store } from '@ngrx/store';
import { LoadEpisodesAction } from '../../states/rickandmorty.actions';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DialogSearchComponent } from '../dialog-search/dialog-search.component';
import { of } from 'rxjs';
import { MaterialModule } from '../../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChangeDetectorRef } from '@angular/core';

describe('EpisodesComponent', () => {
  let component: EpisodesComponent;
  let fixture: ComponentFixture<EpisodesComponent>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;
  let mockStore: jasmine.SpyObj<Store>;
  let mockRickAndMortyService: jasmine.SpyObj<RickAndMortyService>;
  let mockChangeDetectorRef: jasmine.SpyObj<ChangeDetectorRef>;
  beforeEach(async () => {
    mockChangeDetectorRef = jasmine.createSpyObj('ChangeDetectorRef', [
      'detectChanges',
      'markForCheck',
    ]);
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockStore = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    mockRickAndMortyService = jasmine.createSpyObj('RickAndMortyService', [
      'getEpisodes',
    ]);
    const mockEpisodes = {
      show: true,
      results: [{ name: 'Episode 1' }, { name: 'Episode 2' }],
      info: { count: 2 },
      page: 1,
    };
    mockStore.select.and.returnValue(of(mockEpisodes));
    await TestBed.configureTestingModule({
      imports: [MaterialModule, ReactiveFormsModule, BrowserAnimationsModule],
      declarations: [EpisodesComponent],
      providers: [
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: Store, useValue: mockStore },
        { provide: RickAndMortyService, useValue: mockRickAndMortyService },
        { provide: ChangeDetectorRef, useValue: mockChangeDetectorRef },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodesComponent);
    component = fixture.componentInstance;
    component.paginator = new MatPaginator(
      new MatPaginatorIntl(),
      TestBed.inject(ChangeDetectorRef)
    );
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the component', fakeAsync(() => {
    const mockEpisodes = [
      {
        show: true,
        results: [{ name: 'Episode 1' }, { name: 'Episode 2' }],
        info: { count: 2 },
        page: 1,
      },
    ];
    mockStore.select.and.returnValue(of(mockEpisodes));

    component.ngOnInit();

    tick();
    expect(component.paginator.length).toEqual(mockEpisodes[0].info.count);
    expect(component.lengthPaginator).toEqual(mockEpisodes[0].info.count);
    expect(component.indexPage).toEqual(mockEpisodes[0].page - 1);
    expect(mockStore.dispatch).toHaveBeenCalledWith(new LoadEpisodesAction(1));
  }));

  it('should open the dialog on search', () => {
    const mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    mockDialogRef.afterClosed = jasmine
      .createSpy()
      .and.returnValue(of('dialog closed'));

    mockMatDialog.open.and.returnValue(mockDialogRef);
    component.search();

    expect(mockMatDialog.open).toHaveBeenCalledWith(DialogSearchComponent, {
      data: { episodeName: component.filterName.value },
    });
  });
});
