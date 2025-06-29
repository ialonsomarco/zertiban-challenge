import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Movie } from '../models/movies.model';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  public getMovies(): Observable<Movie[]> {}
}
