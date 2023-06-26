import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageAddpatientComponent } from './admin-page-addpatient.component';

describe('AdminPageAddpatientComponent', () => {
  let component: AdminPageAddpatientComponent;
  let fixture: ComponentFixture<AdminPageAddpatientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPageAddpatientComponent]
    });
    fixture = TestBed.createComponent(AdminPageAddpatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
