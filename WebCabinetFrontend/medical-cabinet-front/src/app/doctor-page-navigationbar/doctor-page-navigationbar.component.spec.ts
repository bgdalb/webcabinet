import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorPageNavigationbarComponent } from './doctor-page-navigationbar.component';

describe('DoctorPageNavigationbarComponent', () => {
  let component: DoctorPageNavigationbarComponent;
  let fixture: ComponentFixture<DoctorPageNavigationbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorPageNavigationbarComponent]
    });
    fixture = TestBed.createComponent(DoctorPageNavigationbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
