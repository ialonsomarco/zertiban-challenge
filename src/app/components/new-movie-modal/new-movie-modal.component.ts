import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Movie } from '../../models/movies.model';

@Component({
  selector: 'app-new-movie-modal',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './new-movie-modal.component.html',
  styleUrl: './new-movie-modal.component.scss'
})
export class NewMovieModalComponent {
  // Define the form group for the movie form
  movieForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[\w\s.,!?"'():-]+$/) // Letters, numbers, punctuation
    ]),
    country: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-zÀ-ÿ\s'-]+$/) // Letters and accents
    ]),
    direction: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-zÀ-ÿ\s'-]+$/) // Letters and accents
    ]),
    duration: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1)
    ]),
    genre: new FormControl<string[]>([], [
      Validators.required,
      Validators.minLength(1)
    ]),
    year: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1888), // Year of the first film
      Validators.max(new Date().getFullYear())
    ])
  });


  genres: string[] = [
  "animación",
  "aventura",
  "biográfico",
  "comedia",
  "comedia negra",
  "crimen",
  "deporte",
  "drama",
  "drama psicológico",
  "drama social",
  "fantasía",
  "familiar",
  "guerra",
  "histórico",
  "judicial",
  "misterio",
  "nouvelle vague",
  "política",
  "prostitución",
  "road movie",
  "romance",
  "samurái",
  "terror",
  "thriller",
  "vida rural",
  "western"
]


    
  get f() {
    return this.movieForm.controls;
  }

  constructor(
    public dialogRef: MatDialogRef<NewMovieModalComponent>,
    private snackBar: MatSnackBar
  ) {}

  // Function to check the validity of the form
  checkFormValidity() {
    if (this.movieForm.invalid) {
      this.movieForm.markAllAsTouched();
    }
  }

  onSubmit() {
    console.log(this.movieForm.valid);
    
    if (this.movieForm.valid) {
      const formValue = this.movieForm.value;
      console.log('Form Value:', formValue);
      // let movies = JSON.parse(this.localStorage.getItem('movies')) || [];
      let moviesData = localStorage.getItem('movies') || '[]';

      const newMovie: Movie = {
        id: formValue.title?.toLowerCase().replace(/\s+/g, '-') || '',
        title: formValue.title || '',
        country: formValue.country || '',
        direction: formValue.direction || '',
        duration: Number(formValue.duration || 0),
        genre: formValue.genre || [],
        year: Number(formValue.year || 0)
      };

      localStorage.setItem('movies', JSON.stringify([newMovie, ...JSON.parse(moviesData)]));
      this.dialogRef.close();
      this.snackBar.open('Película creada con éxito', 'Cerrar', {
        duration: 3000,
        panelClass: ['snackbar-success']
      });
      
    }
  }

  // Function to cancel the movie creation
  cancelButton() {
    // Close the dialog without saving
    this.snackBar.open('Creación de película cancelada', 'Cerrar', {
      duration: 3000,
      panelClass: ['snackbar-cancel']
    });
    this.dialogRef.close();
  }
}
