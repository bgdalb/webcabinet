import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageAdddoctorComponent } from './admin-page-adddoctor.component';

describe('AdminPageAdddoctorComponent', () => {
  let component: AdminPageAdddoctorComponent;
  let fixture: ComponentFixture<AdminPageAdddoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPageAdddoctorComponent]
    });
    fixture = TestBed.createComponent(AdminPageAdddoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
