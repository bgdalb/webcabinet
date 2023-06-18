import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageAppointmentviewComponent } from './admin-page-appointmentview.component';

describe('AdminPageAppointmentviewComponent', () => {
  let component: AdminPageAppointmentviewComponent;
  let fixture: ComponentFixture<AdminPageAppointmentviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPageAppointmentviewComponent]
    });
    fixture = TestBed.createComponent(AdminPageAppointmentviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
