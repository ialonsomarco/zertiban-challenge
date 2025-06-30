import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NewMovieModalComponent } from '../../components/new-movie-modal/new-movie-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Movie } from '../../models/movies.model';
import { ApiService } from '../../api/api.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  imports: [
    TableComponent,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {

  moviesData: Movie[] = [];
  originalMoviesData: Movie[] = [];

  constructor(
    private apiService: ApiService,
    private dialogModel: MatDialog,
    private cdrMovies: ChangeDetectorRef,
) {}

  ngOnInit() {
    
    // Call the method to load data when the component initializes
    this.loadData();

  }

  /**
   * Method to load movie data from localStorage or API
   * It checks if movie data is available in localStorage.
   * If available, it parses the data and assigns it to the movie data.
   * If not available, it fetches the data from the API, maps it to the Movie model,
   * and assigns it to the movie data. Finally, it stores the fetched data
   * in localStorage for future use.
   */
  loadData() {
    var moviesDataLS = localStorage.getItem('movies');
    // If data exists, parse it and assign it to the movie data
    if (moviesDataLS) {
      this.moviesData = JSON.parse(moviesDataLS) as Movie[];
      this.originalMoviesData = JSON.parse(moviesDataLS) as Movie[];
      this.cdrMovies.detectChanges();
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
        
        // Assign the fetched data to the movie data
        this.originalMoviesData = movies as Movie[];
        this.moviesData = movies as Movie[];
        this.cdrMovies.detectChanges();
        
        
        // Store the fetched data in localStorage for future use
        localStorage.setItem('movies', JSON.stringify(movies));
        
      });
    }
  }

  /**
   * Method to open a modal dialog for creating a new movie
   */
  newMovie() {
  const dialogRef = this.dialogModel.open(NewMovieModalComponent, {
    width: "740px",
    disableClose: true,
    
  });
  dialogRef.afterClosed().subscribe(result => {
    // After the dialog is closed, reload the data to reflect any changes
    this.loadData();
  });

    
  }
  /**
   * Method to apply a filter to the movie list based on the input value
   * @param event - The event triggered by the input field
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // Filter the movies data based on the input value
    this.moviesData = this.originalMoviesData.filter((item: { title: string; }) =>
      item.title.toLowerCase().includes(filterValue.toLowerCase())
    );
    // Force change detection
    this.cdrMovies.detectChanges();

  }


}
