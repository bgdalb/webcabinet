import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageEditpatientComponent } from './admin-page-editpatient.component';

describe('AdminPageEditpatientComponent', () => {
  let component: AdminPageEditpatientComponent;
  let fixture: ComponentFixture<AdminPageEditpatientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPageEditpatientComponent]
    });
    fixture = TestBed.createComponent(AdminPageEditpatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
