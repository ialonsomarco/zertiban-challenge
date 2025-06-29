import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MoviesService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
  });

  it('should be created', () => {
    const service: MoviesService = TestBed.inject(MoviesService);
    expect(service).toBeTruthy();
  });
});
