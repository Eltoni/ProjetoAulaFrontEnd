import { Injectable } from '@angular/core';
import { CanDeactivate, CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { Observable } from 'rxjs';


@Injectable()
export class ContaGuard implements CanDeactivate<CadastroComponent>, CanActivate{

    localstorage = new LocalStorageUtils

    constructor(private router:Router){}

    canDeactivate(component: CadastroComponent) {

        if(component.mudancasNaoSalvas) {
            return window.confirm('Tem certeza que deseja abandonar o preenchimento do formulario?');
        }  

        return true
        
    }

    canActivate(){

        if(this.localstorage.obterTokenUsuario()){

            this.router.navigate(['/home']);

        }

        return true;
        
    }




}