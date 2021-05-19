import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from "@ngx-translate/core";

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { ComponentsModule } from '@shared/components/components.module';
import { ActorsComponentsModule } from '../components/actors-components.module';
import { ActorsRoutingModule } from './actors-routing.module';

import { ListActorsComponent } from './list-actors/list-actors.component';
import { DetailsActorComponent } from './details-actor/details-actor.component';
import { CreateActorComponent } from './create-actor/create-actor.component';
import { UpdateActorComponent } from './update-actor/update-actor.component';

@NgModule({
  declarations: [
    ListActorsComponent,
    DetailsActorComponent,
    CreateActorComponent,
    UpdateActorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    ComponentsModule,
    ActorsComponentsModule,
    ActorsRoutingModule,

    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    ListActorsComponent,
    DetailsActorComponent,
    CreateActorComponent,
    UpdateActorComponent
  ],
  providers: [
    MatDatepickerModule,
    DatePipe
  ],
})
export class ActorsModule { }
