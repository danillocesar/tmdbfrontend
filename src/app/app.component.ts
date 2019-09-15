import { Component, OnInit } from '@angular/core';
import { MovieService } from './core/service/movie.service';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailsDialogComponent } from './components/movie/details/movie-details.component';
import { joinGenres } from './core/helper/string-helper'
import { MatTabChangeEvent } from '@angular/material/tabs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  moviesModel:ResponseModel;
  currentPage:number = 1;

  searchedMoviesModel:ResponseModel;
  query:string;
  currentQuery:string;
  currentPageSearchMovie:number = 1;

  currentTab:number = 0;
  constructor(private movieService:MovieService, public dialog: MatDialog){}
  
  ngOnInit(): void {
    this.movieService.getUpcoming(this.currentPage).subscribe(response => {
      this.moviesModel = response.data;
      console.log(this.moviesModel)
    });
  }
  findMovies(): void {
    if(this.currentTab == 0){
      ++this.currentPage;
      if(this.currentPage <= this.moviesModel.total_pages){
        this.movieService.getUpcoming(this.currentPage).subscribe(response => {
          this.moviesModel.results.push.apply(this.moviesModel.results, response.data.results);
          console.log(this.moviesModel)
        });
      }
    } else{
      ++this.currentPageSearchMovie;
      if(this.currentPageSearchMovie <= this.searchedMoviesModel.total_pages){
          this.movieService.queryMovie(this.currentQuery, this.currentPageSearchMovie).subscribe(response => {
            this.searchedMoviesModel.results.push.apply(this.searchedMoviesModel.results, response.data.results);
            console.log(this.searchedMoviesModel)
        });
      }
    }
  }

  searchMovies(): void {
    console.log(this.query)
    this.currentQuery = this.query;
    this.currentPageSearchMovie = 1;
    this.movieService.queryMovie(this.query, this.currentPageSearchMovie).subscribe(response => {
      this.searchedMoviesModel = response.data;
      console.log(this.searchedMoviesModel)
    });
  }
  showDetails(movie:Movie):void{
    console.log(movie);
    let dialogRef = this.dialog.open(MovieDetailsDialogComponent, {
      height: '600px',
      width: '800px',
      data: movie
    });
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.currentTab = tabChangeEvent.index
  }

  joinGenres(genres:Genre[]):string{
    return joinGenres(genres);
  }
}
