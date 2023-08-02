import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Colaborador } from '../../model/colaborador';
import { first } from 'rxjs';

@Component({
  selector: 'app-colaboradores-list',
  templateUrl: './colaboradores-list.component.html',
  styleUrls: ['./colaboradores-list.component.scss'],
})
export class ColaboradoresListComponent {
  @Input() colaboradores: Colaborador[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);
  @Output() check = new EventEmitter(false);
  readonly displayedColumns = ['nome', 'cpf', 'itens', 'data', 'ações'];

  onAdd() {
    this.add.emit(true);
  }

  onEdit(colaborador: Colaborador) {
    this.edit.emit(colaborador);
  }

  onDelete(colaborador: Colaborador) {
    this.remove.emit(colaborador);
  }

  onCheck(colaborador: Colaborador) {
    this.check.emit(colaborador);
  }

  getArrayItem(colaborador: Colaborador) {
    return colaborador.cafes.map((element) => {
      return element.item;
    });
  }

  getArrayData(colaborador: Colaborador) {
  const dataSet = new Set(colaborador.cafes.map((element) => element.data));
  return Array.from(dataSet);
  }
}
