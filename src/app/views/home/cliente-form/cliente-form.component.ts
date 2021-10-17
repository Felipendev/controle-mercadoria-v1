import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { empty, Observable, Subject } from 'rxjs';
import { Cliente } from 'src/app/model/cliente.model';
import * as moment from 'moment';

import { ClienteService } from './../../../service/cliente.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import {ConfirmationService, MessageService} from 'primeng/api';



@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ClienteFormComponent implements OnInit {

  isShow = false; 

  form!: FormGroup;
  submitted = false;
  error$ = new Subject<boolean>();

  clientes$!: Observable<Cliente[]>;

  constructor(    
    private fb: FormBuilder,
    private service: ClienteService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService) {}

  ngOnInit(): void {

    this.route.params
    .pipe(
      map((params: any) => params['id']),
      switchMap(id => this.service.loadById(id))
      ).subscribe(cliente => this.updateForm(cliente));
    
    const cliente = this.route.snapshot.data['cliente'];

    this.form = this.fb.group({
      id: [cliente.id],
      nome: [cliente.nome, [this.validarObrigatoriedade, Validators.minLength(2), Validators.maxLength(50)]],
      sobrenome: [cliente.sobrenome, [this.validarObrigatoriedade, Validators.minLength(2), Validators.maxLength(50)]],
      codigo: [cliente.codigo, [this.validarObrigatoriedade, Validators.minLength(4), Validators.maxLength(5)]],
      dataRecebimento: [ cliente.dataRecebimento, this.validarObrigatoriedade],
      dataEntrega: [cliente.dataEntrega],
      contato: [cliente.contato, [this.validarObrigatoriedade, Validators.minLength(8)]],
      statusProduto: [cliente.statusProduto]
    });
    this.onRefresh();
  }

  criaCliente(){
    this.submitted = true;
    let newDate: moment.Moment = moment.utc(this.form.value.dataRecebimento).local();
    this.form.value.dataRecebimento = newDate.format("YYYY-MM-DD");
    if(this.form.valid) {
      console.log('submit');
      console.log(this.form.value)
      if(this.form.value.id) {
        this.service.update(this.form.value).subscribe(
          success => {
            this.messageService.add({severity:'success', summary:'Tudo certo!', detail:'Produto atualizado com sucesso!'});
          },
          error => this.messageService.add({severity:'error', summary:'Rejected', detail:'Error ao atualizar produto, tente novamente!'}),
          () => console.log('update completo')
        );
      } else {
        this.service.postCliente(this.form.value).subscribe(
          success => {
            this.messageService.add({severity:'success', summary:'Tudo certo!', detail:'Produto criado com sucesso!'});
          },
          error => this.messageService.add({severity:'error', summary:'Ops', detail:'Error ao criar produto, tente novamente!'}),
          () => console.log('request completo')
        );
      }
    }
    
    // location.assign("/home");
  }

  updateForm(cliente: Cliente) {
    this.form.patchValue({
      id: cliente.id,
      nome: cliente.nome,
      sobrenome: cliente.sobrenome,
      contato: cliente.contato,
      codigo: cliente.codigo,
      dataRecebimento: cliente.dataRecebimento,
      dataDeEntrega: cliente.dataDeEntrega,
      status: cliente.statusProduto
    })
  }

  validarObrigatoriedade(input: FormControl) {
    return (input.value ? null : { obrigatoriedade: true });
  }

  onRefresh() {
    this.clientes$ = this.service.getClientes()
    .pipe(
      catchError(error => {
        console.error(error);
        this.error$.next(true);
        this.handleError()
        return empty();
      })
    );
  }


  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  handleError() {
    this.messageService.add({severity:'error', summary:'Rejected', detail:'Erro ao carregar produtos. Tente novamente mais tarde'});
  }

  onEdit(id: any) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  cancelar(){
    this.submitted = false;
    this.form.reset();
  }

  atualizaListagemDeProdutos() {
    location.assign("/homePage");
  }





}
