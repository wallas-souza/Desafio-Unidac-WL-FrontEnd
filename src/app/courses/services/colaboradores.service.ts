import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Colaborador } from '../model/colaborador';

@Injectable({
  providedIn: 'root'
})
export class ColaboradoresService {

  private readonly API = 'api/colaboradores';

  constructor( private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Colaborador[]>(this.API)
    .pipe(
      first(),
    );
  }

  loadById(id: string){
    return this.httpClient.get<Colaborador>(`${this.API}/${id}`);
  }

  save(colaborador:Partial<Colaborador> ){
    if(colaborador._id){
      return this.update(colaborador)
    }
   return this.create(colaborador)
  }

  private create(colaborador: Partial<Colaborador>) {
    return this.httpClient.post<Colaborador>(this.API, colaborador).pipe(
      catchError((error) => {
        let errorMessage = 'Erro desconhecido. Tente novamente mais tarde.';
        if (error.status === 409) {
          errorMessage = 'CPF já cadastrado. Tente excluir o seu CPF da tabela primeiro.';
        } else if (error.status === 302) {
          errorMessage = 'Não pode criar colaborador com itens do café repetido. Tente outro item ou outro dia da tabela.';
        } else if(error.status === 403) {
          errorMessage = 'Não pode criar colaborador com um nome já cadastrado. Tente excluir o seu nome da tabela primeiro.';

        }
        return throwError(errorMessage);
      })
    );
  }

  private update(colaborador:Partial<Colaborador>){
    return this.httpClient.put<Colaborador>(`${this.API}/${colaborador._id}`, colaborador);
  }

  delete(id: string){
    return this.httpClient.delete(`${this.API}/${id}`);
  }
}
