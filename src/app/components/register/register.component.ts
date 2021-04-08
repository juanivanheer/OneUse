import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'appr-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;
  hide2 = true;

  minPw = 8;
  formGroup: FormGroup;
  appregister: FormGroup;
  registerUserData = { email: undefined, password: undefined, name: undefined, tipo: "oneuse" }
  recaptcha: boolean = false;
  habilitado: boolean = false;

  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  passwordPattern: " ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}$";
  @ViewChild('recaptcha', { static: true }) recaptchaElement: ElementRef;

  constructor(private http: HttpClient, private _auth: AuthService, private FormBuilder: FormBuilder, private _router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.addRecaptchaScript();
    this.formGroup = this.FormBuilder.group({
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
    }, { validator: passwordMatchValidator });
  }

  registerUser() {
    this._auth.registerUser(this.registerUserData).subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token', res.token)
        window.location.assign("/confirma")
      },
      err => {
        //console.log(err);
        this.openSnackBar("Error en la base de datos. Probar en otro momento", "Aceptar");
      }
    )
    //console.log(this.registerUserData)
  }

  /* RECAPTCHA */
  addRecaptchaScript() {
    window['grecaptchaCallback'] = () => {
      this.renderReCaptcha();
    }
    (function (d, s, id, obj) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://www.google.com/recaptcha/api.js?onload=grecaptchaCallback&amp;render=explicit";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'recaptcha-jssdk', this));
  }

  renderReCaptcha() {
    window['grecaptcha'].render(this.recaptchaElement.nativeElement, {
      'sitekey': '6Lc23XgaAAAAAJ2AaNU4HSksDysKIQEtPyrCpJPr ',
      'callback': (response) => {
        var secret = "6Lc23XgaAAAAAHWgaIEqeN-8jjqEko9XVMNY7qkC";
        this.http.post<any>("https://cors-localhost.herokuapp.com/https://www.google.com/recaptcha/api/siteverify?secret=" + secret + "&response=" + response, {}).subscribe(
          res => {
            if (res.success == true) {
              this.recaptcha = true;
            }
            else this.recaptcha = false;
            this.habilitarRegistrar();
          },
          err => {
            console.log(err)
          }
        )
        this.habilitarRegistrar();
      },
      'expired-callback': (response) => {
        this.recaptcha = false;
        this.habilitarRegistrar();
        document.querySelectorAll("button")[12].disabled = true;
      }
    });
    this.habilitarRegistrar();
  }

  lostPassword() {
    window.location.assign("/lostpassword")
  }

  login() {
    window.location.assign("/login")
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['color-snackbar']
    });
  }

  onSaveForm() {
    if (this.formGroup.valid) {
      this.registerUser();
      console.log('valid');
    } else {
      console.log('Not Valid');
    }
  }

  habilitarRegistrar() {
    if (this.formGroup.status == 'VALID') {
      if (this.recaptcha == true) {
        this.habilitado = true;
        document.querySelectorAll("button")[13].disabled = false;
      }
    } else {
      this.habilitado = false;
      document.querySelectorAll("button")[13].disabled = true;
    }
  }


  /* Shorthands for form controls (used from within template) */
  get password() { return this.formGroup.get('password'); }
  get password2() { return this.formGroup.get('password2'); }
  get name() { return this.formGroup.get('name'); }
  get email() { return this.formGroup.get('email'); }
  /* Called on each input in either password field */
  onPasswordInput() {
    if (this.formGroup.hasError('passwordMismatch')) this.password2.setErrors([{ 'passwordMismatch': true }]);
    else this.password2.setErrors(null);
    this.habilitarRegistrar()
  }
}

export const passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
  if (formGroup.get('password').value === formGroup.get('password2').value)
    return null;
  else
    return { passwordMismatch: true };
};

