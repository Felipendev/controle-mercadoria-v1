import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from 'src/app/model/cliente.model';
import { ClienteService } from 'src/app/service/cliente.service';
import {DialogService} from 'primeng/dynamicdialog';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
import {Message} from 'primeng//api';
import * as moment from 'moment';


@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css'],
  providers: [DialogService, ConfirmationService, MessageService]
})
export class ClienteListComponent implements OnInit {

  @Input() type = "recebido";
  clientes$!: Cliente[];
  cliente!: Cliente;
  clienteSelecionado!: Cliente;
  selectedClients!: Cliente[];
  position!: string;
  productDialog!: boolean;
  submitted!: boolean;
  form!: FormGroup;

  constructor(
    private clienteService: ClienteService,
    private fb: FormBuilder,
    private router: Router,
    public dialogService: DialogService,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe
      (data => this.clientes$ = data);

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
    // this.onRefresh();
  }




  openNew() {
    this.submitted = false;
    this.productDialog = true;
}

validarObrigatoriedade(input: FormControl) {
  return (input.value ? null : { obrigatoriedade: true });
}

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
    this.onRefresh();
}

  onRefresh() {
    location.assign("/produtos");
  }

  onEdit(id: string) { 
    this.productDialog = true;
    this.router.navigate(['/produtos/editar', id], {relativeTo: this.route});
  }

  onDelete(cliente: Cliente) {
    this.clienteSelecionado = cliente;
    this.confirmationService.confirm({
      message: 'Tem certeza que quer excluir ' + cliente.nome + '?',
      header: 'Confirmação de exclusão',
      icon: 'pi pi-info-circle',
      accept: () => {
          this.clienteService.remove(this.clienteSelecionado.id).subscribe();
          this.clientes$ = this.clientes$.filter(val => val.id !== cliente.id);
          this.messageService.add({severity:'success', summary:'Confirmado', detail:'Produto excluido', life: 3000});
    },
  });
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected products?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.clientes$ = this.clientes$.filter(val => !this.selectedClients.includes(val));
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        }
    });
}

criaCliente(){
  this.submitted = true;
  if(this.form.valid) {
    console.log('submit');
    console.log(this.form.value)
    if(this.form.value.id) {
      this.clienteService.update(this.form.value).subscribe(
        success => {
          this.messageService.add({severity:'success', summary:'Tudo certo!', detail:'Produto atualizado com sucesso!'});
          this.productDialog = false;
        },
        error => this.messageService.add({severity:'error', summary:'Rejected', detail:'Error ao atualizar produto, tente novamente!'}),
        () => console.log('update completo')
      );
    } else {
      this.clienteService.postCliente(this.form.value).subscribe(
        success => {
          this.messageService.add({severity:'success', summary:'Tudo certo!', detail:'Produto criado com sucesso!'});
        },
        error => this.messageService.add({severity:'error', summary:'Ops', detail:'Error ao criar produto, tente novamente!'}),
        () => console.log('request completo')
      );
    }
  }  
  this.clientes$ = [...this.clientes$];
}

cancelar(){
  this.submitted = false;
  this.form.reset();
}


hasError(field: string) {
  return this.form.get(field)?.errors;
}

  mudaStatus(cliente: Cliente) {
  this.clienteSelecionado = cliente;
  
  }

  handleError() {
    this.messageService.add({severity:'error', summary:'Falha', detail:'Falha ao buscar produtos. Tente novamente mais tarde'});
  }

}
