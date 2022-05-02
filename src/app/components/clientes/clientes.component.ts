import { Router } from '@angular/router';
import { Cliente } from './../../domains/cliente';
import { ClientesService } from './../../services/clientes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  providers: [ClientesService]
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];
  cliente: Cliente;
  identificacionIngresada: string;
  infoMessage: string;
  showError: boolean = false;
  muestraRegistrarCliente: boolean;

  constructor(public clienteService: ClientesService, private _router: Router) { }

  ngOnInit() {
    this.cliente = new Cliente();
  }

  onBuscarCliente() {
    this.obtenerClientePorIdentificacion(this.cliente.identificacion);
  }

  onCrearNuevoCliente() {
    this.clientes = [];
    this.muestraRegistrarCliente = true;
  }

  onGuardarCliente() {
    this.guardarcliente(this.cliente);
    this.muestraRegistrarCliente = false;
    
  }

  obtenerClientePorIdentificacion(identificacion: string) {
    this.clienteService.obtenerClientePorIdentificacion(identificacion).subscribe(
      res => {
        if (res.error) {
          this.showError = true;
          this.infoMessage = 'Error al obtener el cliente por identificacion';
          return;
        }
        this.cliente = res.response;
        this.clientes = [];
        this.clientes.push(this.cliente);
        this.muestraRegistrarCliente = false;
        this.cliente = new Cliente();
      },
      err => {
        this.showError = true;
        this.infoMessage = 'Error al obtener el cliente';
      });
  }

  guardarcliente(clienteNuevo: Cliente) {
    this.clienteService.guardarCliente(clienteNuevo).subscribe(
      res => {
        if (res.error) {
          this.showError = true;
          this.infoMessage = 'Error al guardar el nuevo cliente';
          return;
        }
        this.cliente = res.response;
        this.clientes = [];
        this.clientes.push(this.cliente);
      },
      err => {
        this.showError = false;
        this.infoMessage = 'Error al guardar el cliente';
      });
  }

}
