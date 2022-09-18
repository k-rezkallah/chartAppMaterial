import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import {
  MAT_COLOR_FORMATS,
  NgxMatColorPickerModule,
  NGX_MAT_COLOR_FORMATS,
} from '@angular-material-components/color-picker';

import { HighchartsChartModule } from 'highcharts-angular';

import { reducers, effects } from './store';

// components
import * as fromComponents from './components';

// containers
import * as fromContainers from './containers';

// services
import * as fromServices from './services';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatCardModule } from '@angular/material/card';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { MatIconModule } from '@angular/material/icon';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'viewmode',
    pathMatch: 'full',
  },
  {
    path: 'viewmode',
    component: fromContainers.HomeComponent,
  },
  { path: 'settings', component: fromContainers.HomeComponent },
  { path: '**', redirectTo: 'viewmode' },
];
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES),

    StoreModule.forFeature('products', reducers),
    EffectsModule.forFeature(effects),

    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    HighchartsChartModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,

    NgxMatColorPickerModule,
  ],
  declarations: [
    ...fromContainers.components,
    ...fromComponents.components,
    DialogComponent,
    DeleteDialogComponent,
  ],
  providers: [
    ...fromServices.services,
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS },
  ],
})
export class ChartsModule {}
