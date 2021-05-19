import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListMoviesComponent } from './list-movies/list-movies.component';
import { DetailsMovieComponent } from './detail-movie/details-movie.component';
import { CreateMovieComponent } from './create-movie/create-movie.component';
import { UpdateMovieComponent } from './update-movie/update-movie.component';

const routes: Routes = [
  {
    path: '',
    component: ListMoviesComponent
  },
  {
    path: 'new',
    component: CreateMovieComponent
  },
  {
    path: ':id',
    component: DetailsMovieComponent
  },
  {
    path: ':id/edit',
    component: UpdateMovieComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
