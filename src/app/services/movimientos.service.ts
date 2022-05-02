import { Movimiento } from './../domains/movimiento';
import { FrontAppRequestOptions } from './../security/front-app-request-options';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import { RestResponse } from '../domains/rest-response';

@Injectable()
export class MovimientosService {

  private commentsUrl = environment.baseUrlPath;

  constructor(private http: Http) { }

  obtenerMovimientos(): Observable<RestResponse> {
    let options = new FrontAppRequestOptions();
    return this.http.get(this.commentsUrl + 'movimiento/obtenerMovimientos', options).map(res => {
      return res.json();
    });
  }

  obtenerMovimientosPorNumeroCuenta(numeroCuenta: string): Observable<RestResponse> {
    let options = new FrontAppRequestOptions();
    return this.http.get(this.commentsUrl + 'movimiento/obtenerCuentaPorNumero/' + numeroCuenta, options).map(res => {
      return res.json();
    });
  }


  guardarMovimiento(movimiento: Movimiento): Observable<RestResponse> {
    let options = new FrontAppRequestOptions();
    return this.http.put(this.commentsUrl + 'movimiento/guardarMovimiento', movimiento, options).map(res => {
      return res.json();
    });
  }
}
