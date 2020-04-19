import { TestBed } from '@angular/core/testing';

import { PACGamesService } from './pac-games.service';

describe('PACGamesService', () => {
  let service: PACGamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PACGamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
