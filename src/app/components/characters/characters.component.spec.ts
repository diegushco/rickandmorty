import {
  ComponentFixture,
  TestBed,
  async,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { ICharacter } from '../../services/rickandmorty.interface';
import { RickAndMortyService } from '../../services/rickandmorty.service';
import * as fromRickMortySelector from './../../states/rickandmorty.selectors';
import { CharactersComponent } from './characters.component';

describe('CharactersComponent', () => {
  let component: CharactersComponent;
  let fixture: ComponentFixture<CharactersComponent>;
  let mockActivatedRoute: any;
  let mockStore: any;
  let mockRickAndMortyService: any;

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: {
        queryParams: {},
      },
    };

    mockStore = {
      select: jasmine.createSpy().and.returnValue(of([])),
    };

    mockRickAndMortyService = {
      getEndpoint: jasmine.createSpy().and.returnValue(of({})),
    };

    await TestBed.configureTestingModule({
      declarations: [CharactersComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Store, useValue: mockStore },
        { provide: RickAndMortyService, useValue: mockRickAndMortyService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set characters$ to an empty array if there are no requests', async(() => {
    mockActivatedRoute.snapshot.queryParams = { location: 'Earth' };

    component.ngOnInit();
    fixture.whenStable().then(() => {
      component.characters$.subscribe((cht) => {
        expect(cht).toEqual([{ error: 'There is not results' }]);
      });
    });
  }));

  it('should return the correct background for status', () => {
    expect(component.getStatusStyles('Alive')).toEqual({
      'background-color': 'green',
    });
    expect(component.getStatusStyles('Dead')).toEqual({
      'background-color': 'gray',
    });
    expect(component.getStatusStyles('unknown')).toEqual({
      'background-color': 'black',
    });
    expect(component.getStatusStyles('')).toEqual({
      'background-color': 'transparent',
    });
  });
});
