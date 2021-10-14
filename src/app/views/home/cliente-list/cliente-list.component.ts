import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/model/cliente.model';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  
  clientes$!: Cliente[];
  clienteSelecionado!: Cliente;

  constructor(private clienteService: ClienteService,
    private router: Router) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe
      (data => this.clientes$ = data);
  }

  novo() {
    this.router.navigate(['/add'])
  }
}
