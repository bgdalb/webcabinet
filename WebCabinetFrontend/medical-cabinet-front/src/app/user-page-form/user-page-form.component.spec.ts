import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPageFormComponent } from './user-page-form.component';

describe('UserPageFormComponent', () => {
  let component: UserPageFormComponent;
  let fixture: ComponentFixture<UserPageFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserPageFormComponent]
    });
    fixture = TestBed.createComponent(UserPageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
