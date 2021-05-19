import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ActorService } from '@shared/services/actor.service';
import { Actor } from '@shared/interfaces/actor.interface';

@Component({
  selector: 'app-update-actor',
  templateUrl: './update-actor.component.html',
  styleUrls: ['./update-actor.component.scss']
})
export class UpdateActorComponent implements OnInit {
  get af() {
    return this.actorForm.controls;
  }

  public actorForm: FormGroup;
  public actor?: Actor;
  public actorId?: number;
  public error: string;
  public state: 'loading' | 'loaded' | 'error';

  public dd: number;
  public MM: number;
  public yyyy: number;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private location: Location,
    private readonly actorService: ActorService
  ) {
    this.actorId = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.initActorForm();
    this.getActor();
  }

  public getActor(): void {
    this.state = 'loading';

    this.actorService.getActor(this.actorId).subscribe(
      (actor: Actor) => {
        this.actor = actor;

        this.af.first_name.patchValue(this.actor.first_name);
        this.af.last_name.patchValue(this.actor.last_name);
        this.af.img.patchValue(this.actor.img);
        this.af.gender.patchValue(this.actor.gender);
        this.af.bornCity.patchValue(this.actor.bornCity);
        this.af.rating.patchValue(this.actor.rating);

        this.dd = parseInt(actor.birthdate.slice(0, 2));
        this.MM = parseInt(actor.birthdate.slice(3, 5));
        this.yyyy= parseInt(actor.birthdate.slice(6, 10));
        console.log(this.dd);
        console.log(this.MM);
        console.log(this.yyyy);
        this.af.birthdate.patchValue(new Date(this.yyyy, this.MM -1, this.dd))

        // this.actorForm.patchValue(actor as { [a: string]: any });

        this.state = 'loaded';
      },
      (err) => {
        this.error = err.message;
        this.state = 'error';
      }
    );
  }

  public initActorForm(): void {
    this.actorForm = this.fb.group({
      first_name: [ '',   Validators.required ],
      last_name:  [ '',   Validators.required ],
      img:        [ '',   Validators.required ],
      gender:     [ '',   Validators.required ],
      bornCity:   [ '',   Validators.required ],
      rating:     [ null, Validators.required ],
      birthdate:  [
        new Date(2021, 1, 1), Validators.required
      ],
    });
  }

  public editActor(): void {
    this.state = 'loading';

    this.actor = {
      first_name: this.af.first_name.value,
      last_name: this.af.last_name.value,
      img: this.af.img.value,
      gender: this.af.gender.value,
      birthdate: this.af.birthdate.value,
      bornCity: this.af.bornCity.value,
      rating: this.af.rating.value,
    };

    this.actorService.updateActor(this.actor, this.actorId).subscribe(
      () => {
        console.log(this.actor);
        this.state = 'loaded';
      },
      (err) => {
        this.error = err.message;
        this.state = 'error';
      }

    );
  }

  public goBack(): void {
    this.location.back();
  }
}
