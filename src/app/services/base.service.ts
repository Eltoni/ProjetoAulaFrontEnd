import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";
import { environment } from "src/environments/environment.development";
//import { environment } from "src/environments/environment.prod"
import { LocalStorageUtils } from "../utils/localstorage";

export abstract class BaseService{

    protected UrlServiceV1: string = environment.apiUrlv1;

    public localStorage = new LocalStorageUtils();


    protected ObterHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

    protected ObterAuthHeaderJson(){
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('app.token')}`
            })
        };
    }
    

    protected extractData(response: any) {
        return response.data || {};
    }

    protected serviceError(response: Response | any) {
        
        let customError: string[] = [];

        if (response instanceof HttpErrorResponse) {

            if(response.statusText === 'Unknown Error'){
                customError.push('Ocorreu um erro desconhecido!')
                response.error.errors = customError;
            }
        }
       

        console.error(response);
        return throwError(response);
    }
}