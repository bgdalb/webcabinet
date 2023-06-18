import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorPageCalendarComponent } from './doctor-page-calendar.component';

describe('DoctorPageCalendarComponent', () => {
  let component: DoctorPageCalendarComponent;
  let fixture: ComponentFixture<DoctorPageCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorPageCalendarComponent]
    });
    fixture = TestBed.createComponent(DoctorPageCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
