import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'colaboradores' },
  {
    path: 'colaboradores',
    loadChildren: () => import('./courses/colaboradores.module').then(m => m.ColaboradoresModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
