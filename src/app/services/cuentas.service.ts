import { Cuenta } from './../domains/cuenta';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import { RestResponse } from '../domains/rest-response';
import { FrontAppRequestOptions } from '../security/front-app-request-options';

@Injectable()
export class CuentasService {

  private commentsUrl = environment.baseUrlPath;

  constructor(private http: Http) { }

  obtenerCuentas(): Observable<RestResponse> {
    let options = new FrontAppRequestOptions();
    return this.http.get(this.commentsUrl + 'cuenta/obtenerCuentas', options).map(res => {
      return res.json();
    });
  }

  obtenerCuentaPorNumero(numeroCuenta: string): Observable<RestResponse> {
    let options = new FrontAppRequestOptions();
    return this.http.get(this.commentsUrl + 'cuenta/obtenerCuentaPorNumero/' + numeroCuenta, options).map(res => {
      return res.json();
    });
  }


  guardarCuenta(cuenta: Cuenta): Observable<RestResponse> {
    let options = new FrontAppRequestOptions();
    return this.http.put(this.commentsUrl + 'cuenta/guardarCuenta', cuenta, options).map(res => {
      return res.json();
    });
  }

}
