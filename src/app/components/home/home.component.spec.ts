import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HomeComponent]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('can create component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct image', () => {
    const imageElement = fixture.debugElement.query(By.css('img'));
    expect(imageElement.nativeElement.src).toContain('assets/images/rickmorty_home.jpg');
  });
});
