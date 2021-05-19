import { Component, OnInit } from '@angular/core';

import { Movie } from '@shared/interfaces/movie.interface';
import { MovieService } from '@shared/services/movie.service';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.scss']
})
export class ListMoviesComponent implements OnInit {

  public state: 'loading' | 'loaded' | 'error';

  public movies: Movie[];

  constructor(
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.getMovieList();
  }

  public getMovieList(): void{
    this.state = 'loading';
    this.movieService.getMovies().subscribe(
      (movies: Movie[]) => {
        this.movies = movies;
        this.state = 'loaded';
      },
       err => {
         this.state = 'error';
      }
    );
  }
}
