import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginNavigationbarComponent } from './login-navigationbar.component';

describe('LoginNavigationbarComponent', () => {
  let component: LoginNavigationbarComponent;
  let fixture: ComponentFixture<LoginNavigationbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginNavigationbarComponent]
    });
    fixture = TestBed.createComponent(LoginNavigationbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
