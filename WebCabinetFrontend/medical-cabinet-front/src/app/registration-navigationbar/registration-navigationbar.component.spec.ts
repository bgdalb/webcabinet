import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationNavigationbarComponent } from './registration-navigationbar.component';

describe('RegistrationNavigationbarComponent', () => {
  let component: RegistrationNavigationbarComponent;
  let fixture: ComponentFixture<RegistrationNavigationbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationNavigationbarComponent]
    });
    fixture = TestBed.createComponent(RegistrationNavigationbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
