import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { DimensionsComponent } from './dimensions.component';
import { provideMockStore } from '@ngrx/store/testing';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('DimensionsComponent', () => {
  let component: DimensionsComponent;
  let fixture: ComponentFixture<DimensionsComponent>;
  let mockStore: jasmine.SpyObj<Store>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockPaginator: jasmine.SpyObj<MatPaginator>;
  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockPaginator = jasmine.createSpyObj('MatPaginator', ['firstPage']);
    const mockLocations = { results: [] };
    mockStore.select.and.returnValue(of(mockLocations));

    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
      ],
      declarations: [DimensionsComponent],
      providers: [
        provideMockStore(),
        { provide: Store, useValue: mockStore },
        { provide: Router, useValue: mockRouter },
        { provide: MatPaginator, useValue: mockPaginator },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(DimensionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to characters', () => {
    const mockDimension = {
      id: 1,
      dimension: 'Dimension C-137',
      residents: [],
      type: 'Dimension',
    };
    mockStore.select.and.returnValue(of([{ results: mockDimension }]));
    component.goCharacters(mockDimension);

    expect(mockStore.dispatch).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/characters'], {
      queryParams: { dimension: mockDimension.dimension },
    });
  });

  it('should update dataSource.filter and call firstPage if paginator exists', fakeAsync(() => {
    const filterValue = 'Planet';
    const event = { target: { value: filterValue } } as any;
    component.applyFilter(event);
    tick();
    expect(component.dataSource.filter).toBe(filterValue.trim().toLowerCase());
  }));
});
