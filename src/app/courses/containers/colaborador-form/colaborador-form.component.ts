import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { ColaboradoresService } from '../../services/colaboradores.service';
import { Colaborador } from '../../model/colaborador';
import { Cafe } from '../../model/cafe';
import { FormUtilsService } from 'src/app/shared/form/form-utils.service';


@Component({
  selector: 'app-colaborador-form',
  templateUrl: './colaborador-form.component.html',
  styleUrls: ['./colaborador-form.component.scss']
})

export class ColaboradorFormComponent implements OnInit {

  form!: FormGroup;

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: ColaboradoresService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    public formUtils: FormUtilsService){

  }

  ngOnInit(): void {
    const colaborador: Colaborador = this.route.snapshot.data['colaborador'];
    this.form = this.formBuilder.group({
      _id: [colaborador._id],
      nome: [colaborador.nome,[Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      cpf: [colaborador.cpf, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      cafes: this.formBuilder.array(this.retriveCafes(colaborador), Validators.required)
    });
  }

  private retriveCafes(colaborador: Colaborador){
    const cafes = [];
    if(colaborador?.cafes){
      colaborador.cafes.forEach(cafe => cafes.push(this.criarCafe(cafe)))
    } else {
      cafes.push(this.criarCafe());
    }
    return cafes;
  }

  private criarCafe(cafe: Cafe = {id: '', item: '', data: new Date}) {
    return this.formBuilder.group({
      id: [cafe.id],
      item: [cafe.item ,[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      data: [cafe.data, [Validators.required, this.dataFuturaValidator]]
    });

  }

  getCafesFormArray(){
    return (<UntypedFormArray>this.form.get('cafes')).controls;
  }

  addNovoCafe(){
    const cafes = this.form.get('cafes') as UntypedFormArray ;
    cafes.push(this.criarCafe());
  }

  removerCafe(index: number){
    const cafes = this.form.get('cafes') as UntypedFormArray ;
    cafes.removeAt(index)
  }

  onSubmit() {
    if (this.form.valid) {
      this.service.save(this.form.value).subscribe(
        (data) => this.onSucesso(),
        (error) => {
          this.snackBar.open(error, 'Fechar', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        }
      );
    } else {
      this.formUtils.validateAllFormFields(this.form);
    }
  }

  onNomeInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.toLowerCase();
  }

  onCancel(){
    this.location.back();
  }

  private onSucesso(){
    this.snackBar.open('Sucesso ao salvar o colaborador!','',{duration: 5000});
    this.onCancel();
  }

  private onError(){
    this.snackBar.open('Erro ao salvar o colaborador.','',{duration: 5000});
  }

  dataFuturaValidator(control: AbstractControl): { [key: string]: any } | null {
    const dataSelecionada = new Date(control.value);
    const dataAtual = new Date();


    if (dataSelecionada >= dataAtual) {
      return null;
    } else {
      return { dataFuturaInvalida: true };
    }
  }
}
