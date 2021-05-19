import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { LoadingFeedbackComponent } from './loading-feedback/loading-feedback.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { CardComponent } from './card/card.component';
import { AlertComponentComponent } from './alert-component/alert-component.component';


@NgModule({
  declarations: [
    LoadingFeedbackComponent,
    SidenavComponent,
    CardComponent,
    AlertComponentComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,

    MatToolbarModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,

    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    LoadingFeedbackComponent,
    SidenavComponent,
    CardComponent,
    AlertComponentComponent
  ]
})
export class ComponentsModule { }
