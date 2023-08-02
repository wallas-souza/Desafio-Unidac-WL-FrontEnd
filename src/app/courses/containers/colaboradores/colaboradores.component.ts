import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Colaborador } from '../../model/colaborador';
import { ColaboradoresService } from '../../services/colaboradores.service';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.scss'],
})
export class ColaboradoresComponent {
  colaboradores$: Observable<Colaborador[]> | null = null;

  constructor(
    private colaboradoresService: ColaboradoresService,
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.refresh();
  }

  refresh() {
    this.colaboradores$ = this.colaboradoresService.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar os cursos.');
        return of([]);
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  onAdd() {
    this.router.navigate(['novo'], { relativeTo: this.route });
  }

  onEdit(colaborador: Colaborador) {
    this.router.navigate(['edit', colaborador._id], { relativeTo: this.route });
  }

  onDelete(colaborador: Colaborador) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover o colaborador?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.colaboradoresService.delete(colaborador._id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Colaborador removido com sucesso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
          },
          () => this.onError('Erro ao tentar remover colaborador.')
        );
      }
    });
  }

  onCheck(colaborador: Colaborador) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const temDataHoje = colaborador.cafes.some(cafe => {
    const dataCafe = new Date(cafe.data);
    dataCafe.setHours(24, 0, 0, 0);
    return hoje.getTime() === dataCafe.getTime();
  });

  if (!temDataHoje) {
    this.snackBar.open('Não é possível checar o colaborador em uma data diferente!', 'X', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
    return;
  }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'O colaborador Trouxe os itens para o café?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.colaboradoresService.delete(colaborador._id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Colaborador checado!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
          },
          () => this.onError('Erro ao tentar checar colaborador.')
        );
      }
    });
  }
}
