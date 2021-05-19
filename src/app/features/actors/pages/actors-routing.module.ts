import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListActorsComponent } from './list-actors/list-actors.component';
import { DetailsActorComponent } from './details-actor/details-actor.component'
import { CreateActorComponent } from './create-actor/create-actor.component';
import { UpdateActorComponent } from './update-actor/update-actor.component'

const routes: Routes = [
  {
    path: '',
    component: ListActorsComponent
  },
  {
    path: 'new',
    component: CreateActorComponent
  },
  {
    path: ':id',
    component: DetailsActorComponent
  },
  {
    path: ':id/edit',
    component: UpdateActorComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActorsRoutingModule { }
