import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { ColaboradorFormComponent } from './containers/colaborador-form/colaborador-form.component';
import { ColaboradoresRoutingModule } from './colaboradores-routing.module';
import { ColaboradoresComponent } from './containers/colaboradores/colaboradores.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ColaboradoresListComponent } from './components/colaboradores-list/colaboradores-list.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';


@NgModule({
  declarations: [
    ColaboradoresComponent,
    ColaboradorFormComponent,
    ColaboradoresListComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    ColaboradoresRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ColaboradoresModule { }
