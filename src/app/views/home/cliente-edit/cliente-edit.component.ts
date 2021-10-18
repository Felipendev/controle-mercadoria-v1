import { catchError, map, switchMap } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { empty, Subject, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

import { ClienteService } from 'src/app/service/cliente.service';
import { Cliente } from 'src/app/model/cliente.model';
import { ConfirmationService, MessageService } from 'primeng/api';

interface Status {
  name: string
}



@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.css'],
  providers: [ConfirmationService, MessageService]
}) 
export class ClienteEditComponent implements OnInit {

  isShow = false;  
  searchValue!: string;
  form!: FormGroup;
  submitted = false;
  error$ = new Subject<boolean>();

  clientes$!: Observable<Cliente[]>;
  status!: Status[];
  selectedStatus!: Status;

  constructor(
    private fb: FormBuilder,
    private service: ClienteService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private location: Location) { 
    this.status = [
      {name: 'RECEBIDO' },
      {name: 'ENTREGUE'},
      {name: 'DELETADO'},
    ];
  }

  ngOnInit(): void {

    this.route.params
    .pipe(
      map((params: any) => params['id']),
      switchMap(id => this.service.loadById(id))
      ).subscribe(cliente => this.updateForm(cliente));
    
    const cliente = this.route.snapshot.data['cliente'];

    this.form = this.fb.group({
      id: [cliente.id],
      nome: [cliente.nome],
      sobrenome: [cliente.sobrenome],
      codigo: [cliente.codigo],
      dataRecebimento: [cliente.dataRecebimento],
      dataDeEntrega: [cliente.dataDeEntrega],
      contato: [cliente.contato],
      statusProduto: [cliente.statusProduto]
    });
    this.onRefresh();
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
      statusProduto: cliente.statusProduto
    })
  }

  validarObrigatoriedade(input: FormControl) {
    return (input.value ? null : { obrigatoriedade: true });
  }

  editaCliente(){
    this.submitted = true;
    let dataRecebimento: moment.Moment = moment.utc(this.form.value.dataRecebimento).local();
    this.form.value.dataRecebimento = dataRecebimento.format("YYYY-MM-DD");
    let dataDeEntrega: moment.Moment = moment.utc(this.form.value.dataDeEntrega).local();
    this.form.value.dataDeEntrega = dataDeEntrega.format("YYYY-MM-DD");
    if(this.form.valid) {
      console.log('submit');
      console.log(this.form.value)
      if(this.form.value.id) {
        this.service.update(this.form.value).subscribe(
          success => {
            this.messageService.add({severity:'success', summary:'Tudo certo!', detail:'Produto atualizado com sucesso!'});
            setTimeout(function(){ 

              window.location.href = "/produtos";
        
        }, 500);
            
          },
          error => this.messageService.add({severity:'error', summary:'Rejected', detail:'Error ao atualizar produto, tente novamente!'}),
          () => console.log('update completo')
        );
      }
    }
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

  paginaInicial(){
    this.router.navigate(['/produtos'])
  }



}
