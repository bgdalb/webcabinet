import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTopbarComponent } from './home-topbar.component';

describe('HomeTopbarComponent', () => {
  let component: HomeTopbarComponent;
  let fixture: ComponentFixture<HomeTopbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeTopbarComponent]
    });
    fixture = TestBed.createComponent(HomeTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
