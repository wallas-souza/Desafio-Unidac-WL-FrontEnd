import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { CpfPipe } from './pipes/cpf.pipe';



@NgModule({
  declarations: [
    ErrorDialogComponent,
    CpfPipe
  ],
  imports: [
    AppMaterialModule,
    CommonModule
  ],
  exports: [
    ErrorDialogComponent,
    CpfPipe
  ]
})
export class SharedModule { }
