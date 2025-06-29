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

@Component({
  selector: 'app-home',
  imports: [
    TableComponent,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {

  moviesData: Movie[] = [];
  constructor(
    private apiService: ApiService,
    private dialogModel: MatDialog,
    private cdrMovies: ChangeDetectorRef,
) {}

  ngOnInit() {
    
    // Call the method to load data when the component initializes
    this.loadData();

  }

  loadData() {
    var moviesDataLS = localStorage.getItem('movies');
    // If data exists, parse it and assign it to the movie data
    if (moviesDataLS) {
      this.moviesData = JSON.parse(moviesDataLS) as Movie[];
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
        this.moviesData = movies as Movie[];
        this.cdrMovies.detectChanges();
        
        
        // Store the fetched data in localStorage for future use
        localStorage.setItem('movies', JSON.stringify(movies));
        
      });
    }
  }

  // Methodto open a modal dialog for creating a new movie
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
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filterPredicate = (data: Movie, filter: string) => {
  //     return data.name.toLowerCase().includes(filter.toLowerCase());
  //   };
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }


}
