import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageAddserviceComponent } from './admin-page-addservice.component';

describe('AdminPageAddserviceComponent', () => {
  let component: AdminPageAddserviceComponent;
  let fixture: ComponentFixture<AdminPageAddserviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPageAddserviceComponent]
    });
    fixture = TestBed.createComponent(AdminPageAddserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
