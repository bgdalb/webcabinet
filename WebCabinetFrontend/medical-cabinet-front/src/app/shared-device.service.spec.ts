import { TestBed } from '@angular/core/testing';

import { SharedDeviceService } from './shared-device.service';

describe('SharedDeviceService', () => {
  let service: SharedDeviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedDeviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
