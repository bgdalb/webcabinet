import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPageNavigationbarComponent } from './user-page-navigationbar.component';

describe('UserPageNavigationbarComponent', () => {
  let component: UserPageNavigationbarComponent;
  let fixture: ComponentFixture<UserPageNavigationbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserPageNavigationbarComponent]
    });
    fixture = TestBed.createComponent(UserPageNavigationbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
