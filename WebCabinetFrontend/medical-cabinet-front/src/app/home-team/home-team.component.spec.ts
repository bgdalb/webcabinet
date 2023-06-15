import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTeamComponent } from './home-team.component';

describe('HomeTeamComponent', () => {
  let component: HomeTeamComponent;
  let fixture: ComponentFixture<HomeTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeTeamComponent]
    });
    fixture = TestBed.createComponent(HomeTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
