import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
// }}import { CLIENTES } from './clientes.json';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';
//import { switchAll } from 'rxjs';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];

    
  constructor(private clienteService: ClienteService) {}
  
  ngOnInit() {
    // this.clientes = this.clienteService.getClientes();
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes

    );
   
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
  confirmButtonText: "Yes, delete it!"
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


  
   