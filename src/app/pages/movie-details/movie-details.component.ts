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

      // Check if movies data is already stored in localStorage
      const moviesData = localStorage.getItem('movies');
      // If data exists, parse it and assign it to the data source
      if (moviesData) {
        let movies: Movie[] = JSON.parse(moviesData);
        // Find the movie with the matching ID and assign the found movie to the component's movie property
        this.movie = movies.find(movie => movie.id === this.movieId);

        this.cdrMovie.detectChanges();
          
      } else {
        // If no data in localStorage, fetch it from the API
        // this.loadData();
      }
    });

  }

  loadData() {
    // Fetch data from the API service
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

  

  // Function to navigate back to the movies list
  goBackToMovies() {
    this.router.navigate(['/home']);
  }

}
