import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location, DatePipe } from '@angular/common';

import { ActorService } from '@app/shared/services/actor.service'
import { Actor } from '@shared/interfaces/actor.interface';

@Component({
  selector: 'app-create-actor',
  templateUrl: './create-actor.component.html',
  styleUrls: ['./create-actor.component.scss']
})
export class CreateActorComponent implements OnInit {
  get af() {
    return this.actorForm.controls;
  }

  public actorForm: FormGroup;
  public actor: Actor;
  public error: string;
  public state: 'loading' | 'loaded' | 'error';

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private location: Location,
    private readonly datePipe: DatePipe,
    private readonly actorService: ActorService
  ) {
  }

  ngOnInit(): void {
    this.state = 'loading';
    this.initActorForm();
  }

  public initActorForm(): void {
    this.actorForm = this.fb.group({
      first_name: [ '',   Validators.required ],
      last_name:  [ '',   Validators.required ],
      img:        [ '',   Validators.required ],
      gender:     [ '',   Validators.required ],
      birthdate:  [ null, Validators.required ],
      bornCity:   [ '',   Validators.required ],
      rating:     [ null, Validators.required ],
    });

    this.state = 'loaded';
  }

  public addActor(): void {
    this.state = 'loading';

    this.actor = {
      first_name: this.af.first_name.value,
      last_name: this.af.last_name.value,
      gender: this.af.gender.value,
      birthdate: this.datePipe.transform(this.af.birthdate.value, "dd-MM-yyyy"),
      bornCity: this.af.bornCity.value,
      img: this.af.img.value,
      rating: this.af.rating.value,
      movies: []
    }

    this.actorService.addActor(this.actor).subscribe(
      () => this.state = 'loaded',
      (err) => {
        this.error = err.message;
        this.state = 'error';
      }
    );

    this.router.navigate(['actors']);
  }

  public goBack(): void {
    this.location.back();
  }
}
