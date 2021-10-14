import { ClienteService } from 'src/app/service/cliente.service';
import { Cliente } from 'src/app/model/cliente.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  clientes$!: Cliente[];
  clienteSelecionado!: Cliente;

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe
      (data => this.clientes$ = data);
  }

}
