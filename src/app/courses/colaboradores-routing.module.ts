import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ColaboradorFormComponent } from './containers/colaborador-form/colaborador-form.component';
import { ColaboradoresComponent } from './containers/colaboradores/colaboradores.component';
import { colaboradorResolver } from './guards/colaborador.resolver';

const routes: Routes = [
  { path: '', component: ColaboradoresComponent},
  { path: 'novo', component: ColaboradorFormComponent, resolve: { colaborador: colaboradorResolver } },
  { path: 'edit/:id', component: ColaboradorFormComponent, resolve: { colaborador: colaboradorResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColaboradoresRoutingModule { }
