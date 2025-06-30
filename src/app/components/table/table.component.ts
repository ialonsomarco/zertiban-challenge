import { ChangeDetectionStrategy, Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Movie } from '../../models/movies.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {

  // Table components
  dataSource = new MatTableDataSource<Movie>();
  displayedColumns: string[] = ['title', 'direction', 'year', 'genre', 'country', 'duration', 'action'];

  @Input() data: Movie[] | undefined;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router) {}

 
  ngOnInit() {
    console.log('TableComponent initialized with moviesData:', this.data);
    
    // Assign the input moviesData to the data source
    this.dataSource.data = this.data || [];
  }


  // After view initialization, set the sort and paginator for the data source
  ngAfterViewInit(): void {
    
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // Detects when the data changes
  ngOnChanges(changes: SimpleChanges) {
    // If moviesData input changes, update the data source
    if (changes['data']) {      
      this.dataSource.data = this.data as Movie[]; 
    }
  }

  /**
   * Method to view movie details
   * @param row The selected movie row
   */
  viewMovie(row: Movie) {
    // Navigate to the movie with the selected movie's ID
    this.router.navigate(['/movie-details', row.id ]);

  }
}
