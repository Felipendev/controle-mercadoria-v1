import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/model/cliente.model';
import { ClienteService } from 'src/app/service/cliente.service';
import {DialogService} from 'primeng/dynamicdialog';
import { ClienteFormComponent } from '../cliente-form/cliente-form.component';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css'],
  providers: [DialogService, ConfirmationService, MessageService]
})
export class ClienteListComponent implements OnInit {

  
  clientes$!: Cliente[];
  clienteSelecionado!: Cliente;
  position!: string;

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    public dialogService: DialogService,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

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

  onDelete(cliente: Cliente) {
    this.clienteSelecionado = cliente;
    this.confirmationService.confirm({
      message: 'Você quer excluir esse produto?',
      header: 'Confirmação de exclusão',
      icon: 'pi pi-info-circle',
      accept: () => {
          this.clienteService.remove(this.clienteSelecionado.id).subscribe();
          this.messageService.add({severity:'info', summary:'Confirmado', detail:'Produto excluido'});
          setTimeout(function(){ 
            window.location.href = "/produtos";      
      }, 500);
    },
      reject: (type: any) => {
          switch(type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({severity:'error', summary:'Rejected', detail:'Voce rejeitou'});
              break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({severity:'warn', summary:'Cancelled', detail:'Você cancelou'});
              break;
          }
      }
  });
  }

  // confirmPosition(position: string) {
  //   this.position = position;

  //   this.confirmationService.confirm({
  //       message: 'Você quer excluir esse produto?',
  //       header: 'Confirmação de exclusão',
  //       icon: 'pi pi-info-circle',
  //       accept: () => {
  //         this.clienteService.remove(this.clienteSelecionado.id).subscribe;
  //           this.messageService.add({severity:'info', summary:'Confirmado', detail:'Produto excluidoooooo'});
  //           setTimeout(function(){ 

  //             window.location.href = "/produtos";
        
  //       }, 500);
  //       },
  //       reject: (type: any) => {
  //           switch(type) {
  //               case ConfirmEventType.REJECT:
  //                   this.messageService.add({severity:'error', summary:'Rejeitado', detail:'Voce rejeitou'});
  //               break;
  //               case ConfirmEventType.CANCEL:
  //                   this.messageService.add({severity:'warn', summary:'Cancelado', detail:'Você cancelou'});
  //               break;
  //           }
  //       },
  //       key: "positionDialog"
  //   });
//}

mudaStatus(cliente: Cliente) {
  this.clienteSelecionado = cliente;
  
}

}
