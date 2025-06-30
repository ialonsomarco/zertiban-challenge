import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Movie } from '../../models/movies.model';
import { ApiService } from '../../api/api.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-movie-details',
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent implements OnInit {

  // Inject the ActivatedRoute service to access route parameters
  private _activatedRoute = inject(ActivatedRoute);


  constructor(
    private apiService: ApiService,
    private router: Router,
    private cdrMovie: ChangeDetectorRef,
) {}

  movie: Movie | undefined;
  movieId: string | undefined;

  ngOnInit() {

    // Fetch the movie ID from the route parameters
    // and use it to fetch the movie details from the API service
    this._activatedRoute.params.subscribe(params => {
      this.movieId = params['id'];
      // Call the method to load data when the component initializes
      this.loadData();
    });

  }

  /**
   * Method to load movie data from localStorage or API
   * It checks if movie data is available in localStorage.
   * If available, it parses the data and assigns it to the movie data.
   * If not available, it fetches the data from the API, maps it to the Movie model,
   * and assigns it to the movie data.
   */
  loadData() {
    var moviesDataLS = localStorage.getItem('movies');
    // If data exists, parse it and assign it to the movie data
    if (moviesDataLS) {
      let movies: Movie[] = JSON.parse(moviesDataLS);
      // Find the movie with the matching ID and assign the found movie to the component's movie property
      this.movie = movies.find(movie => movie.id === this.movieId);
      this.cdrMovie.detectChanges();
    } else {
      // If no data in localStorage, fetch it from the API
      this.apiService.getData().subscribe((data) => {

        // Map the received data to the Movie model
        let movies: Movie[] = data.map((item: any) => {
          return {
            id: item.title.toLowerCase().replace(/\s+/g, '-'),
            title: item.title,
            country: item.country,
            direction: item.direction,
            duration: item.duration,
            genre: item.genre,
            year: item.release_year,
          } as Movie;
        });
        
        this.movie = movies.find(movie => movie.id === this.movieId);
        this.cdrMovie.detectChanges();
        
      });
    }
  }

  
  /**
   * Method to navigate back to the movies list
   */
  goBackToMovies() {
    this.router.navigate(['/home']);
  }

}
