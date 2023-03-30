import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
//npm i @narik/custom-validators 
import { CustomValidators, NarikCustomValidatorsModule } from '@narik/custom-validators';
import { ToastrService } from 'ngx-toastr';

import { Usuario } from '../models/usuario';
import { ContaService } from '../services/conta.service';
import { fromEvent, merge, Observable } from 'rxjs';

//import { FormBaseComponent } from 'src/app/base-components/form-base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[] = [];

  errors: any[] = [];
  loginForm!: FormGroup;
  usuario!: Usuario;

  displayMessage: DisplayMessage = {};
  genericValidator!: GenericValidator;
  validationMessages: ValidationMessages;

  constructor(private toastr: ToastrService,
    private fb: FormBuilder,
    private contaService: ContaService,
    private router: Router) {

    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido'
      },
      password: {
        required: 'Informe a senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres'
      },
      confirmPassword: {
        required: 'Informe a senha novamente',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
        equalTo: 'As senhas não conferem'
      }
    };
    this.genericValidator = new GenericValidator(this.validationMessages);

   // super.configurarMensagensValidacaoBase(this.validationMessages);
  }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,CustomValidators.rangeLength([6, 15])]]
      
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

  merge(...controlBlurs).subscribe(() => {
    this.displayMessage = this.genericValidator.processarMensagens(this.loginForm);
  });
  }


  login() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.usuario = Object.assign({}, this.usuario, this.loginForm.value);

      this.contaService.login(this.usuario)
        .subscribe(
          sucesso => {this.processarSucesso(sucesso)},
          falha => {this.processarFalha(falha)}
        )

       
    }
   
  }

  processarSucesso(response: any) {
    
    this.loginForm.reset();

    this.errors = [];

    this.contaService.localStorage.salvarDadosLocaisUsuario(response);

    let toastr = this.toastr.success('Login Realizado com sucesso!Seja bem vindo!');

    if(toastr){
      toastr.onHidden.subscribe( () =>
      
      {

        this.router.navigate(['/home']);

      }

      )
    }

    //this.router.navigate(['/home']);
   
  }
 
  processarFalha(fail: any) {

    this.errors = fail.error.errors;

    this.toastr.error('Opa!Ocorreu algum Erro!!');
   
  }
}

