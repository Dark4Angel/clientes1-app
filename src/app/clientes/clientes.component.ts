import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
// import { CLIENTES } from './clientes.json';
import { ClienteService } from './cliente.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit {

  clientes!: Cliente[];

    
  constructor(private clienteService: ClienteService) {}
  
  ngOnInit() {
    // this.clientes = this.clienteService.getClientes();
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes

    );
   
      
  }
}
