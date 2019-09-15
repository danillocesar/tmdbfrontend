import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { joinGenres } from '../../../core/helper/string-helper'

@Component({
    selector: 'movie-details.component',
    templateUrl: 'movie-details.component.html',
  })
export class MovieDetailsDialogComponent {
    movie:Movie;

    constructor(public dialogRef: MatDialogRef<MovieDetailsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Movie) {
          this.movie = data;
    }
    joinGenres(genres:Genre[]):string{
        return joinGenres(genres);
    }
  }