import { TipoMovimiento } from './../../domains/tipo-movimiento.enum';
import { Router } from '@angular/router';
import { MovimientosService } from './../../services/movimientos.service';
import { CuentasService } from './../../services/cuentas.service';
import { Movimiento } from './../../domains/movimiento';
import { Cuenta } from './../../domains/cuenta';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css'],
  providers: [CuentasService, MovimientosService]
})
export class MovimientosComponent implements OnInit {
  infoMessage: string;
  showError: boolean = false;
  muestraRegistrarMovimiento: boolean;
  cuentas: Cuenta[];
  movimiento: Movimiento;
  movimientos: Movimiento[];
  tiposMovimiento = TipoMovimiento;
  tiposMovimiento1 = null;
  enumkeys = [];

  constructor(public cuentaService: CuentasService, private _router: Router, public movimientoService: MovimientosService) { }

  ngOnInit() {
    this.movimiento = new Movimiento();
  }

  onCrearNuevoMovimiento() {
    this.movimiento = new Movimiento();
    this.muestraRegistrarMovimiento = true;
    this.obtenerCuentas();
    this.enumkeys = Object.keys(this.tiposMovimiento).filter(f => !isNaN(Number(f)))
  }

  change1(value: string) {
    this.tiposMovimiento1 = this.tiposMovimiento[value];
  }

  onGuardarMovimiento() {
    this.guardarMovimiento(this.movimiento);
    this.muestraRegistrarMovimiento = false;
    this.enumkeys = [];
    
  }

  obtenerCuentas() {
    this.cuentaService.obtenerCuentas().subscribe(
      res => {
        if (res.error) {
          this.showError = true;
          this.infoMessage = 'Error al obtener todas las cuentas';
          return;
        }
        this.cuentas = res.response;
      },
      err => {
        this.showError = true;
        this.infoMessage = 'Error al obtener las cuentas';
      });
  }

  guardarMovimiento(movimiento: Movimiento) {
    this.movimientoService.guardarMovimiento(movimiento).subscribe(
      res => {
        if (res.error) {
          this.showError = true;
          this.infoMessage = 'Error al guardar el movimiento';
          return;
        }
        this.movimiento = res.response;
        this.movimientos = [];
        this.movimientos.push(this.movimiento);
        this.movimiento = new Movimiento();
        this.cuentas = [];
      },
      err => {
        this.showError = false;
        this.infoMessage = 'Error al guardar el movimiento';
      });
  }

}
