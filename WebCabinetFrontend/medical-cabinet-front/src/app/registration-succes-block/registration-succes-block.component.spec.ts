import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationSuccesBlockComponent } from './registration-succes-block.component';

describe('RegistrationSuccesBlockComponent', () => {
  let component: RegistrationSuccesBlockComponent;
  let fixture: ComponentFixture<RegistrationSuccesBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationSuccesBlockComponent]
    });
    fixture = TestBed.createComponent(RegistrationSuccesBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
