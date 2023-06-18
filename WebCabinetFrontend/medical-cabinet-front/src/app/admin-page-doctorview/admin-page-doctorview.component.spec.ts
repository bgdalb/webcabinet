import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageDoctorviewComponent } from './admin-page-doctorview.component';

describe('AdminPageDoctorviewComponent', () => {
  let component: AdminPageDoctorviewComponent;
  let fixture: ComponentFixture<AdminPageDoctorviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPageDoctorviewComponent]
    });
    fixture = TestBed.createComponent(AdminPageDoctorviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
