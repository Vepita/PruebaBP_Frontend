import { Cliente } from './../../domains/cliente';
import { ClientesService } from './../../services/clientes.service';
import { CuentasService } from './../../services/cuentas.service';
import { Cuenta } from './../../domains/cuenta';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css'],
  providers: [CuentasService, ClientesService]
})
export class CuentasComponent implements OnInit {
  cuenta: Cuenta;
  cuentas: Cuenta[];
  clientes: Cliente[];
  infoMessage: string;
  showError: boolean = false;
  muestraRegistrarCuenta: boolean;

  constructor(public cuentaService: CuentasService, private _router: Router, public clienteService: ClientesService) { }

  ngOnInit() {
    this.cuenta = new Cuenta();
  }

  onBuscarCuenta() {
    this.obtenerCuentaPorNumero(this.cuenta.numeroCuenta);
  }

  onCrearNuevoCuenta() {
    this.cuentas = [];
    this.muestraRegistrarCuenta = true;
    this.obtenerClientes();
  }

  onGuardarCuenta() {
    this.guardarCuenta(this.cuenta);
    this.muestraRegistrarCuenta = false;

  }

  obtenerCuentaPorNumero(numeroCuenta: string) {
    this.cuentaService.obtenerCuentaPorNumero(numeroCuenta).subscribe(
      res => {
        if (res.error) {
          this.showError = true;
          this.infoMessage = 'Error al obtener la cuenta por numero';
          return;
        }
        this.cuenta = res.response;
        this.cuentas = [];
        this.cuentas.push(this.cuenta);
        this.muestraRegistrarCuenta = false;
        this.cuenta = new Cuenta();
      },
      err => {
        this.showError = true;
        this.infoMessage = 'Error al obtener la cuenta';
      });
  }

  guardarCuenta(cuentaNueva: Cuenta) {
    this.cuentaService.guardarCuenta(cuentaNueva).subscribe(
      res => {
        if (res.error) {
          this.showError = true;
          this.infoMessage = 'Error al guardar la nueva cuenta';
          return;
        }
        this.cuenta = res.response;
        this.cuentas = [];
        this.cuentas.push(this.cuenta);
      },
      err => {
        this.showError = false;
        this.infoMessage = 'Error al guardar el cliente';
      });
  }

  obtenerClientes() {
    this.clienteService.obtenerClientes().subscribe(
      res => {
        if (res.error) {
          this.showError = true;
          this.infoMessage = 'Error al obtener todos los clientes';
          return;
        }
        this.clientes = res.response;
      },
      err => {
        this.showError = true;
        this.infoMessage = 'Error al obtener los clientes';
      });
  }

}
