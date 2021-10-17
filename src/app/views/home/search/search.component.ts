import { ClienteService } from 'src/app/service/cliente.service';
import { Cliente } from 'src/app/model/cliente.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  clientes$!: Cliente[];
  clienteSelecionado!: Cliente;

  constructor(
    private clienteService: ClienteService,
    private router: Router) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe
      (data => this.clientes$ = data);
  }

  paginaInicial(){
    this.router.navigate(['/produtos'])
  }

}
