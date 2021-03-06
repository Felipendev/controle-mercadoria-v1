import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, catchError } from 'rxjs/operators';

import { Cliente } from '../model/cliente.model';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  status: string[] = ['RECEBIDO', 'ENTREGUE', 'DELETADO'];
  API = environment.apiUrl;


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  getClientes(){
    return this.http.get<Cliente[]>( this.API + "/listAll").pipe(catchError(this.handleError));
  }

  handleError(error: any) {
    return throwError(error.message || "Erro ao buscar produtos")
  }

  loadById(id: any) {
    return this.http.get<Cliente>(`${this.API}/${id}`).pipe(take(1));
  }

  postCliente(cliente: Cliente){
    return this.http.post<Cliente>(this.API, cliente, this.httpOptions).pipe(take(1));;
  }

  update(cliente: Cliente){
    return this.http.put<Cliente>(`${this.API}/${cliente.id}`, cliente).pipe(take(1));;
  }

  remove(id: number) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
}
