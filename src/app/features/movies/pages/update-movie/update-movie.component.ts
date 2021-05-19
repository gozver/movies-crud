import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Movie } from '@shared/interfaces/movie.interface';
import { MovieService } from '@shared/services/movie.service';

@Component({
  selector: 'app-update-movie',
  templateUrl: './update-movie.component.html',
  styleUrls: ['./update-movie.component.scss']
})
export class UpdateMovieComponent implements OnInit {
  get mf(): { [key: string]: AbstractControl; } {
    return this.movieForm.controls;
  }

  public movieForm: FormGroup;
  public state: 'loading' |'loaded' | 'error';

  public actorsSelected = [];
  public genresSelected = [];
  public movieGenres = [];
  public movieActors = [];
  public genretCtrl = new FormControl();
  public movie: Movie;
  public movieId: number;

  constructor(
    private formBuilder: FormBuilder,
    private movieService: MovieService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.state = 'loaded';
    this.movieId = +this.route.snapshot.paramMap.get('id');
    this.initMovieForm();
  }

  public initMovieForm(): void {
    this.movieForm = this.formBuilder.group({
      title:      ['', [Validators.required, Validators.minLength(3)]],
      poster:     [''],
      genre:      [''],
      year:       ['', Validators.required],
      duration:   ['', Validators.required],
      imdbRating: ['', Validators.required],
      actors:     [''],
    });

    this.state = 'loading';

    this.movieService.getMovieById(this.movieId).subscribe(
      (movie: Movie) => {
        this.movie = movie;
        this.movieForm.patchValue(movie as { [s: string]: any });
        this.state = 'loaded';
        this.movieGenres = this.movie.genre;
        this.movieForm.get('genre').setValue('');
        this.movieActors = this.movie.actors;
        this.actorsSelected = this.movie.actors;
        this.genresSelected = this.movie.genre;
      },
      err => {
        this.state = 'error';
      }
    );
  }

  public onGenreChange(event: string[]): void{
    this.genresSelected = event;
  }

  public onActorChange(event: number[]): void{
    this.actorsSelected = event;
  }

  public updateMovie(): void{
    this.state = 'loading';
    this.movieForm.patchValue({ genre: this.genresSelected, actors: this.actorsSelected });
    this.movie = {
      title: this.mf.title.value,
      poster: this.mf.poster.value,
      genre: this.genresSelected,
      year: this.mf.year.value,
      duration: this.mf.duration.value,
      imdbRating: this.mf.imdbRating.value,
      actors: this.actorsSelected,
    };

    this.movieService.updateMovie(this.movie, this.movieId).subscribe(
      response => {
        this.movieForm.patchValue(response as { [s: string]: any });
        this.movieForm.get('genre').setValue('');
        this.state = 'loaded';
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
