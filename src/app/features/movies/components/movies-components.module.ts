import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { MatChipsModule } from '@angular/material/chips';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MoviesFormComponent } from './movies-form/movies-form.component';

@NgModule({
  declarations: [
    MoviesFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,

    MatChipsModule,

    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    MoviesFormComponent
  ]
})
export class MoviesComponentsModule { }
