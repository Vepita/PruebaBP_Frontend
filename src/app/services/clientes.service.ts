import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import { RestResponse } from '../domains/rest-response';
import { FrontAppRequestOptions } from '../security/front-app-request-options';
import { Cliente } from './../domains/cliente';

@Injectable()
export class ClientesService {

  private commentsUrl = environment.baseUrlPath;

  constructor(private http: Http) { }

  obtenerClientes(): Observable<RestResponse> {
    let options = new FrontAppRequestOptions();
    return this.http.get(environment.baseUrlPath + 'cliente/obtenerClientes', options).map(res => {
      return res.json();
    });
  }

  obtenerClientePorIdentificacion(identificacion: string): Observable<RestResponse> {
    let options = new FrontAppRequestOptions();
    return this.http.get(environment.baseUrlPath + 'cliente/obtenerClientePorIdentificacion/' + identificacion, options).map(res => {
      return res.json();
    });
  }


  guardarCliente(cliente: Cliente): Observable<RestResponse> {
    let options = new FrontAppRequestOptions();
    return this.http.post(environment.baseUrlPath + 'cliente/guardarCliente', cliente, options).map(res => {
      return res.json();
    });
  }

}
