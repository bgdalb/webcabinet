import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorPageMedicalhistoryComponent } from './doctor-page-medicalhistory.component';

describe('DoctorPageMedicalhistoryComponent', () => {
  let component: DoctorPageMedicalhistoryComponent;
  let fixture: ComponentFixture<DoctorPageMedicalhistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorPageMedicalhistoryComponent]
    });
    fixture = TestBed.createComponent(DoctorPageMedicalhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
