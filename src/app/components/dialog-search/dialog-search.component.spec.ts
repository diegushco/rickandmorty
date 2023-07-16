import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { RickAndMortyService } from '../../services/rickandmorty.service';
import { DialogSearchComponent } from './dialog-search.component';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

describe('DialogSearchComponent', () => {
  let component: DialogSearchComponent;
  let fixture: ComponentFixture<DialogSearchComponent>;
  let rickAndMortyService: RickAndMortyService;
  let mockRickAndMortyService: jasmine.SpyObj<RickAndMortyService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockRouter: jasmine.SpyObj<Router>;
  beforeEach(async () => {
    mockRickAndMortyService = jasmine.createSpyObj('RickAndMortyService', [
      'getAllEpisodesByName',
      'getAllLocationsByName',
    ]);
    mockDialog = jasmine.createSpyObj('MatDialog', ['closeAll']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, RouterTestingModule, MatTableModule],
      declarations: [DialogSearchComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: { episodeName: 'Test Episode' },
        },
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: RickAndMortyService,
          useValue: {
            getAllEpisodesByName: () => of([]),
            getAllLocationsByName: () => of([]),
          },
        },
        { provide: MatDialog, useValue: mockDialog },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSearchComponent);
    component = fixture.componentInstance;
    component.response$ = of([]);
    rickAndMortyService = TestBed.inject(RickAndMortyService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct displayed columns', () => {
    expect(component.displayedColumns).toEqual(['name', 'characters']);
  });

  it('should have empty data source', () => {
    expect(component.dataSource).toEqual([]);
  });

  it('should call getAllEpisodesByName when we have a episode', fakeAsync(() => {
    const episodeName = 'Pilot';
    const response = [{ name: 'Pilot', characters: [] }];

    component.data = { episodeName: episodeName };
    spyOn(rickAndMortyService, 'getAllEpisodesByName').and.returnValue(
      of(response)
    );

    component.ngOnInit();
    tick();

    expect(rickAndMortyService.getAllEpisodesByName).toHaveBeenCalledWith(
      episodeName
    );
  }));

  it('should close the dialog and navigate to characters', () => {
    const itemSelected = 'episode1';
    component.data = { episodeName: 'Episode 1' };

    component.goCharacters(itemSelected);

    expect(mockDialog.closeAll).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/characters'], {
      queryParams: { episode: itemSelected },
    });
  });
});
