import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';

import { Observable } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { BaseService } from 'src/app/services/base.service';

@Injectable()
export class ContaService extends BaseService{
    

    constructor(private http: HttpClient) { super(); }

    registrarUsuario(usuario: Usuario) : Observable<Usuario> {
        let response = this.http
            .post(this.UrlServiceV1 + 'nova-conta', usuario, super.ObterHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
            
        return response;
    }

    login(usuario: Usuario) : Observable<Usuario> {
        let response = this.http
            .post(this.UrlServiceV1 + 'entrar', usuario, super.ObterHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
            
        return response;
    }

     
}