import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorPagePatientviewComponent } from './doctor-page-patientview.component';

describe('DoctorPagePatientviewComponent', () => {
  let component: DoctorPagePatientviewComponent;
  let fixture: ComponentFixture<DoctorPagePatientviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorPagePatientviewComponent]
    });
    fixture = TestBed.createComponent(DoctorPagePatientviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
