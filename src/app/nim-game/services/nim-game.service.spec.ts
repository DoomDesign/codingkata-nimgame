import { TestBed } from '@angular/core/testing';

import { NimGameService } from './nim-game.service';
import { I18nPluralPipe } from '@angular/common';

describe('NimGameService', () => {
  let service: NimGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
			providers: [I18nPluralPipe]
		});
    service = TestBed.inject(NimGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
