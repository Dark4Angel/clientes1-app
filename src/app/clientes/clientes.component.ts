import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
// }}import { CLIENTES } from './clientes.json';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';
import {tap} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
//import { switchAll } from 'rxjs';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  paginador : any;
  
  

    
  constructor(private clienteService: ClienteService,
  private activatedRoute : ActivatedRoute) {}
  
  ngOnInit() {

    this.activatedRoute.paramMap.subscribe (params => {
      let page: number = +params.getAll('page');
    // this.clientes = this.clienteService.getClientes();
    if(!page) {
      page = 0;
    }

    this.clienteService.getClientes(page)
    .pipe(
      tap(response => {
        console.log('ClientesComponent: tap 3');
        (response.content as Cliente[]).forEach(cliente => console.log(cliente.nombre));
        })
      
      ).subscribe(response => {
        this.clientes = response.content as Cliente[];
        this.paginador = response;
      });
  });
}



  getPromise = () => {
    return Promise.resolve();
  };

   /* delete(cliente: Cliente): void {
    Swal.fire({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
    
      title: '¿Está seguro?',
      text: `Esta accion es irreversible, ${cliente.nombre} ${cliente.apellido} será eliminado permanentemente.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            Swal.fire(
              'Cliente Eliminado!',
              `Cliente ${cliente.nombre} eliminado con éxito.`,
              'success'
    
            )
          }
        )

      }
    })
  }

} 
    */


delete(cliente: Cliente): void {
Swal.fire({
  title: "¿Estás seguro?",
  text: "¡No serás capaz de revertir esto!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "¡Sí, eliminar!",
  cancelButtonText: 'No, cancelar',
}).then((result) => {
  if (result.isConfirmed) {

    this.clienteService.delete(cliente.id).subscribe(
      response => {
        this.clientes = this.clientes.filter(cli => cli !== cliente)
    Swal.fire({
      title: `¡${cliente.nombre} Eliminado!`,
      text: "El cliente ha sido eliminado.",
      icon: "success"
    })
    });
  }
  
})
};
}  


  
   