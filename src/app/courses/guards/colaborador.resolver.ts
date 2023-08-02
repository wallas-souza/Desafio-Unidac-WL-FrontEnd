import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Colaborador } from '../model/colaborador';
import { ColaboradoresService } from './../services/colaboradores.service';

export const colaboradorResolver: ResolveFn<Observable<Colaborador>> =
  (route, state, service: ColaboradoresService = inject(ColaboradoresService)) => {
    if (route.params?.['id']) {
      return service.loadById(route.params['id']).pipe(
        map((colaborador: Colaborador) => {
          colaborador.cafes.forEach(cafe => {
            const dataCafe = new Date(cafe.data);
            dataCafe.setHours(24, 0, 0, 0);
            cafe.data = dataCafe;
          });
          return colaborador;
        })
      );
    }
    return of({ _id: '', nome: '', cpf: '', cafes: [] });
  };
