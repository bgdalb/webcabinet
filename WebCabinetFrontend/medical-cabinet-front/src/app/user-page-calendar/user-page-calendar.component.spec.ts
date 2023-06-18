import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPageCalendarComponent } from './user-page-calendar.component';

describe('UserPageCalendarComponent', () => {
  let component: UserPageCalendarComponent;
  let fixture: ComponentFixture<UserPageCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserPageCalendarComponent]
    });
    fixture = TestBed.createComponent(UserPageCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
