import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ActorService } from '@app/shared/services/actor.service'
import { Actor } from '@shared/interfaces/actor.interface';

@Component({
  selector: 'app-list-actors',
  templateUrl: './list-actors.component.html',
  styleUrls: ['./list-actors.component.scss']
})
export class ListActorsComponent implements OnInit {
  public actorsList: Actor[];
  public error: string;
  public state: 'loading' | 'loaded' | 'error';

  constructor(
    private readonly router: Router,
    private readonly actorService: ActorService
  ) { }

  ngOnInit(): void {
    this.getActorsList();
  }

  public getActorsList(): void {
    this.state = 'loading';

    this.actorService.getActors().subscribe(
      (actorsList: Actor[]) => {
        this.actorsList = actorsList;
        this.state = 'loaded';
      },
      (err) => {
        this.error = err.message;
        this.state = 'error';
      }
    );
  }
}
