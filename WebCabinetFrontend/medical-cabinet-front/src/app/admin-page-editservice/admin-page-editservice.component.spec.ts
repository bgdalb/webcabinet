import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageEditserviceComponent } from './admin-page-editservice.component';

describe('AdminPageEditserviceComponent', () => {
  let component: AdminPageEditserviceComponent;
  let fixture: ComponentFixture<AdminPageEditserviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPageEditserviceComponent]
    });
    fixture = TestBed.createComponent(AdminPageEditserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
