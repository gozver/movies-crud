import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { MatChipInputEvent } from '@angular/material/chips';
import { Actor } from '@shared/interfaces/actor.interface';
import { ActorService } from '@shared/services/actor.service';

@Component({
  selector: 'app-movies-form',
  templateUrl: './movies-form.component.html',
  styleUrls: ['./movies-form.component.scss']
})
export class MoviesFormComponent implements OnInit {
  @Input() movieForm: FormGroup;
  @Input() movieGenres: any[];
  @Input() movieActors: any[];

  @Output() genresSelectedEmitter = new EventEmitter<any[]>();
  @Output() actorsSelectedEmitter = new EventEmitter<any[]>();

  public actorsSelected = [];
  public actorsObjectSelected = [];
  public genresSelected = [];
  public genretCtrl = new FormControl();

  public actors: Actor[];
  public form: FormGroup;

  constructor(
    private actorService: ActorService
  ) { }

  ngOnInit(): void {
    this.actorService.getActors().subscribe(
      (actorsList: Actor[]) => {
        this.actors = actorsList;

        if (this.movieActors) {
          this.actorsObjectSelected = this.actors.filter(o1 => this.movieActors.some(o2 => o1.id === o2));
          this.actorsSelected = this.movieActors;
        }
      }
    );

    if (this.movieGenres) {
      this.genresSelected = this.movieGenres;
    }
  }

  public add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.genresSelected.push(value.trim());
    }

    if (input) {
      input.value = '';
    }

    this.genretCtrl.setValue(null);
    this.genresSelectedEmitter.emit(this.genresSelected);
  }

  public removeGenre(genreRemove: string): void {
    const index = this.genresSelected.indexOf(genreRemove);

    if (index >= 0) {
      this.genresSelected.splice(index, 1);
    }

    this.genresSelectedEmitter.emit(this.genresSelected);
  }

  public removeActor(actorRemove: number): void {
    this.actorsSelected = this.actorsSelected.filter((e) => e.id !== actorRemove);
    this.actorsObjectSelected = this.actorsObjectSelected.filter((e) => e.id !== actorRemove);
    this.actorsSelectedEmitter.emit(this.actorsSelected);
  }

  public selectChangeHandler(event: any): void{
    this.actorsObjectSelected.push(event.value);
    this.actorsSelected.push(event.value.id);
    this.actorsSelectedEmitter.emit(this.actorsSelected);
  }
}
