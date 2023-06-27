import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageEditdoctorComponent } from './admin-page-editdoctor.component';

describe('AdminPageEditdoctorComponent', () => {
  let component: AdminPageEditdoctorComponent;
  let fixture: ComponentFixture<AdminPageEditdoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPageEditdoctorComponent]
    });
    fixture = TestBed.createComponent(AdminPageEditdoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
