import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPageMedicalhistoryComponent } from './user-page-medicalhistory.component';

describe('UserPageMedicalhistoryComponent', () => {
  let component: UserPageMedicalhistoryComponent;
  let fixture: ComponentFixture<UserPageMedicalhistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserPageMedicalhistoryComponent]
    });
    fixture = TestBed.createComponent(UserPageMedicalhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
