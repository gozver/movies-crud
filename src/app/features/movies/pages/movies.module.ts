import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from "@ngx-translate/core";

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { PipesModule } from '@shared/pipes/pipes.module';
import { ComponentsModule } from '@shared/components/components.module';
import { MoviesComponentsModule } from '../components/movies-components.module';
import { MoviesRoutingModule } from './movies-routing.module';

import { ListMoviesComponent } from './list-movies/list-movies.component';
import { DetailsMovieComponent } from './detail-movie/details-movie.component';
import { CreateMovieComponent } from './create-movie/create-movie.component';
import { UpdateMovieComponent } from './update-movie/update-movie.component';

@NgModule({
  declarations: [
    ListMoviesComponent,
    DetailsMovieComponent,
    CreateMovieComponent,
    UpdateMovieComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    PipesModule,
    ComponentsModule,
    MoviesComponentsModule,
    MoviesRoutingModule,

    MatListModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    ListMoviesComponent,
    DetailsMovieComponent,
    CreateMovieComponent,
    UpdateMovieComponent
  ]
})
export class MoviesModule { }
