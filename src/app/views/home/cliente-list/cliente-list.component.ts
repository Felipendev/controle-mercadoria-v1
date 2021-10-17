import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/model/cliente.model';
import { ClienteService } from 'src/app/service/cliente.service';
import {DialogService} from 'primeng/dynamicdialog';
import { ClienteFormComponent } from '../cliente-form/cliente-form.component';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css'],
  providers: [DialogService]
})
export class ClienteListComponent implements OnInit {

  
  clientes$!: Cliente[];
  clienteSelecionado!: Cliente;

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    public dialogService: DialogService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe
      (data => this.clientes$ = data);
  }

  show() {
    const ref = this.dialogService.open(ClienteFormComponent, {
        header: 'Novo produto',
        width: '50%',
        contentStyle: {"min-width": "70%", "overflow": "auto"},
        baseZIndex: 10000
    });
  }

  onRefresh() {
    location.assign("/produtos");
  }

  onEdit(id: string) {
    this.router.navigate(['/produtos/editar', id], {relativeTo: this.route});
  }

}
