import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AlertComponentComponent } from '@shared/components/alert-component/alert-component.component';
import { forkJoin } from 'rxjs';

import { ActorService } from '@app/shared/services/actor.service'
import { MovieService } from '@shared/services/movie.service'
import { Actor } from '@shared/interfaces/actor.interface';
import { Movie } from '@shared/interfaces/movie.interface';

@Component({
  selector: 'app-details-actor',
  templateUrl: './details-actor.component.html',
  styleUrls: ['./details-actor.component.scss']
})
export class DetailsActorComponent implements OnInit {
  public actor: Actor;
  public actorId: number;
  public moviesList: Movie[];
  public error: string;
  public state: 'loading' | 'loaded' | 'error';

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private location: Location,
    public dialog: MatDialog,
    private readonly actorService: ActorService,
    private readonly movieService: MovieService
  ) {
    this.actorId = parseInt(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getData();
  }

  public getData(): void {
    forkJoin({
      actorRequest: this.actorService.getActor(this.actorId),
      movieRequest: this.movieService.getMovies(),
    }).subscribe(({ movieRequest, actorRequest }) => {
      this.actor = actorRequest;
      this.moviesList = movieRequest.filter(m => this.actor?.movies.some(a => a === m.id));
      this.state = 'loaded';
    });
  }

  public deleteActor(): void {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(AlertComponentComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.actorService.deleteActor(this.actorId).subscribe(
          (actor: Actor) => {
            this.actor = actor;
            this.state = 'loaded';
            this.router.navigate(['actors']);
          },
          (err) => {
            this.error = err.message;
            this.state = 'error';
          }
        );
      }
    });
  }

  setDefaultImg(): void {
    this.actor.img = 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg';
  }

  public goBack(): void {
    this.location.back();
  }
}
