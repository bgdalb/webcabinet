import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageNavigationbarComponent } from './admin-page-navigationbar.component';

describe('AdminPageNavigationbarComponent', () => {
  let component: AdminPageNavigationbarComponent;
  let fixture: ComponentFixture<AdminPageNavigationbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPageNavigationbarComponent]
    });
    fixture = TestBed.createComponent(AdminPageNavigationbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
