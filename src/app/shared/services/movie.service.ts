import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Movie } from '@shared/interfaces/movie.interface';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(
    private http: HttpClient
  ) { }

  public getMovies(): Observable<Movie[]>{
    return this.http.get<Movie[]>(`${environment.apiUrl}/movies`);
  }

  public getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${environment.apiUrl}/movies/${id}`);
  }

  public updateMovie(movie: Movie, id: number): Observable<Movie>{
    return this.http.patch<Movie>(`${environment.apiUrl}/movies/${id}`, movie);
  }

  public createMovie(movie: Movie): Observable<Movie>{
    return this.http.post<Movie>(`${environment.apiUrl}/movies`, movie);
  }

  public deleteMovie(id: number): Observable<Movie>{
    return this.http.delete<Movie>(`${environment.apiUrl}/movies/${id}`);
  }
}
