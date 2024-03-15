import { TestBed } from '@angular/core/testing';

import { LogSleepServiceService } from './log-sleep-service.service';

describe('LogSleepServiceService', () => {
  let service: LogSleepServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogSleepServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
