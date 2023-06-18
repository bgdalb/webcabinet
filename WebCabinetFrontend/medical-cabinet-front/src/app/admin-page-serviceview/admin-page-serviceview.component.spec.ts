import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageServiceviewComponent } from './admin-page-serviceview.component';

describe('AdminPageServiceviewComponent', () => {
  let component: AdminPageServiceviewComponent;
  let fixture: ComponentFixture<AdminPageServiceviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPageServiceviewComponent]
    });
    fixture = TestBed.createComponent(AdminPageServiceviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
