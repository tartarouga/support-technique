import { TestBed } from '@angular/core/testing';

import { ReclamService } from './reclam.service';

describe('ReclamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReclamService = TestBed.get(ReclamService);
    expect(service).toBeTruthy();
  });
});
