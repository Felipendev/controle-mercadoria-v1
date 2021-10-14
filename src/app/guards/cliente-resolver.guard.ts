import { ClienteService } from 'src/app/service/cliente.service';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { Cliente } from '../model/cliente.model';


@Injectable({
  providedIn: 'root'
})
export class ClienteResolverGuard implements Resolve<Cliente> {

  constructor(
    private service: ClienteService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    
    if(route.params && route.params['id']) {
     return this.service.loadById(route.params['id']);
    }

    return of({
      id: null,
      nome: null,     
      sobrenome: null,
      codigo: null,
      dataRecebimento: null,
      dataEntrega: null,
      contato: null,
      statusProduto: null
    });
  }
  
  
}
