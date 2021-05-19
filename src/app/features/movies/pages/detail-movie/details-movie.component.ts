import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';

import { Movie } from '@shared/interfaces/movie.interface';
import { MovieService } from '@shared/services/movie.service';
import { AlertComponentComponent } from '@shared/components/alert-component/alert-component.component';
import { ActorService } from '@shared/services/actor.service';
import { Actor } from '@shared/interfaces/actor.interface';

@Component({
  selector: 'app-details-movie',
  templateUrl: './details-movie.component.html',
  styleUrls: ['./details-movie.component.scss']
})
export class DetailsMovieComponent implements OnInit {
  public state: 'loading' | 'loaded' | 'error' = 'loading';
  public error: string;
  public movie: Movie;
  public movieId: number;
  public actors: Actor[];

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    public dialog: MatDialog,
    private actorService: ActorService
  ) {}

  ngOnInit(): void {
    this.movieId = +this.route.snapshot.paramMap.get('id');
    this.getMovie();
  }

  public getMovie(): void{
    this.state = 'loading';

    forkJoin({
      movieRequest: this.movieService.getMovieById(this.movieId),
      actorRequest:  this.actorService.getActors()
    }).subscribe(({movieRequest, actorRequest}) => {
      this.movie = movieRequest;
      this.actors = actorRequest.filter(a => this.movie.actors.some(b => b === a.id));
      this.state = 'loaded';
    });
  }

  setDefaultImg(): void {
    this.movie.poster = 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg';
  }

  public deleteMovie(): void {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(AlertComponentComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.state = 'loading';
        this.movieService.deleteMovie(this.movieId).subscribe(
          response => {
            this.state = 'loaded';
            this.router.navigate(['/']);
          },
          err => {
            this.state = 'error';
          }
        );
      }
    });
  }

  public goBack(): void {
    this.location.back();
  }
}
