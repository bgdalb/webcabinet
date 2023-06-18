import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPagePatientviewComponent } from './admin-page-patientview.component';

describe('AdminPagePatientviewComponent', () => {
  let component: AdminPagePatientviewComponent;
  let fixture: ComponentFixture<AdminPagePatientviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPagePatientviewComponent]
    });
    fixture = TestBed.createComponent(AdminPagePatientviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
