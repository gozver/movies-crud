import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { MovieService } from '@shared/services/movie.service';
import { Movie } from '@shared/interfaces/movie.interface';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.scss']
})
export class CreateMovieComponent implements OnInit {
  get mf(): { [key: string]: AbstractControl; }{
    return this.movieForm.controls;
  }

  public movieForm: FormGroup;
  public state: 'loading' |'loaded' | 'error';
  public actorsSelected = [];
  public genresSelected = [];
  public genretCtrl = new FormControl();
  public movie: Movie;

  constructor(
    private formBuilder: FormBuilder,
    private movieService: MovieService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.state = 'loaded';
    this.initMovieForm();
  }

  public initMovieForm(): void {
    this.movieForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      poster: [''],
      genre: [''],
      year: ['', Validators.required],
      duration: ['', [Validators.required]],
      imdbRating: ['', [Validators.required]],
      actors: [''],
    });
  }

  public onGenreChange(event): void{
    this.genresSelected = event;
  }

  public onActorChange(event): void{
    this.actorsSelected = event;
  }

  public createMovie(): void{
    this.state = 'loading';
    this.movie = {
      title: this.mf.title.value,
      poster: this.mf.poster.value,
      genre: this.genresSelected,
      year: this.mf.year.value,
      duration: this.mf.duration.value,
      imdbRating: this.mf.imdbRating.value,
      actors: this.actorsSelected,
    };

    this.movieService.createMovie(this.movie).subscribe(
      response => {
        this.router.navigate(['/movies', response.id ]);
      },
      err => {
        this.state = 'error';
      }
    );
  }

  public goBack(): void {
    this.location.back();
  }
}
