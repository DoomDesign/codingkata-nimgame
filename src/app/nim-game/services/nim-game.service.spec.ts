import { TestBed } from '@angular/core/testing';

import { NimGameService } from './nim-game.service';

describe('NimGameService', () => {
  let service: NimGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NimGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
