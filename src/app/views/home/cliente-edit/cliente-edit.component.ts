import { StatusProduto } from 'src/app/model/status-produto.enum';
import { ClienteService } from 'src/app/service/cliente.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Cliente } from 'src/app/model/cliente.model';

interface Status {
  name: string
}



@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.css']
}) 
export class ClienteEditComponent implements OnInit {

  isShow = false;  
  searchValue!: string;
  form!: FormGroup;
  submitted = false;
  private fb!: FormBuilder;
  error$ = new Subject<boolean>();

  clientes$!: Cliente[];
  clienteSelecionado!: Cliente;

  status!: Status[];

  selectedStatus!: Status;
  

  constructor(private clienteService: ClienteService) { 
    this.status = [
      {name: 'RECEBIDO' },
      {name: 'ENTREGUE'},
      {name: 'DELETADO'},
    ];
  }

  ngOnInit(): void {
    
    this.clienteService.getClientes().subscribe
      (data => this.clientes$ = data);

  }

  criaCliente() {
    
  }

    value1: any;

    value2: any;

    value3: any;

    value4: any;

    value5: any;

    value6: any;

    value7: any;

    value8: any;
    
    value9: any;

    value10: any;

    value11: any;

    valueIconLeft: any;

    valueIconRight: any;


}
