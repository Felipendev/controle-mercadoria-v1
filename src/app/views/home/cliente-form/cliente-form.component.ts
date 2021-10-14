import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { Cliente } from 'src/app/model/cliente.model';

import { ClienteService } from './../../../service/cliente.service';



@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {

  isShow = false;  
  searchValue!: string;
  form!: FormGroup;
  submitted = false;
  private fb!: FormBuilder;
  error$ = new Subject<boolean>();

  clientes$!: Cliente[];
  clienteSelecionado!: Cliente;

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    
    this.clienteService.getClientes().subscribe
      (data => this.clientes$ = data);

  }

  criaCliente(form: NgForm) {
    console.log(form)
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
