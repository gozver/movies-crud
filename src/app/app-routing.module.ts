import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule, TranslatePipe } from "@ngx-translate/core";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full'
  },
  {
    path: 'movies',
    loadChildren: () => import('./features/movies/pages/movies.module').then(m => m.MoviesModule)
  },

  {
    path: 'actors',
    loadChildren: () => import('./features/actors/pages/actors.module').then(m => m.ActorsModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    TranslateModule
  ],
  exports: [
    RouterModule,
    TranslatePipe
  ]
})
export class AppRoutingModule { }
