import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
//import { Observable } from 'rxjs';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import {map, catchError} from 'rxjs/operators';
import Swal from 'sweetalert2';
//import { Error } from 'console';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  private urlEndPoint:string = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router) { }
  
  getClientes(): Observable<Cliente[]> {
    //return of (CLIENTES);
    //return this.http.get<Cliente[]>(this.urlEndPoint);
/*     return this.http.get(this.urlEndPoint).pipe(
    map((response)=> response as Cliente[])
    );
  } */
  return this.http.get<Cliente[]>(this.urlEndPoint);
  }


  create(cliente: Cliente) : Observable<Cliente> {
  
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire('Error al crear al cliente', e.error.mensaje, 'error');
        return throwError(() => new Error('test'));

      })
        
    );
  }

  /* getCliente(id:any): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`)
  } */

  getCliente(id:any): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e =>{
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(() => new Error('test'));
      })
    );
  }

  update(cliente: Cliente): Observable<Cliente>{
  return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
    catchError(e => {
      console.error(e.error.mensaje);
      Swal.fire('Error al editar cliente', e.error.mensaje, 'error');
      return throwError(() => new Error('test'));

    })
  )
}

  delete(id: number): Observable<Cliente>{
  return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
    catchError(e => {
      console.error(e.error.mensaje);
      Swal.fire('Error al eliminar cliente', e.error.mensaje, 'error');
      return throwError(() => new Error('test'));

    })
  )
}

  
}


