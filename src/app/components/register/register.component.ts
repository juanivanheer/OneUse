import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';

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
  registerUserData = {email: undefined, password: undefined, name: undefined}

  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  passwordPattern: " ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}$";


  constructor(private _auth: AuthService, private FormBuilder: FormBuilder, private _router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit() {
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
        //console.log(res)
        localStorage.setItem('token', res.token)
        this._router.navigate(['/confirma'])
      },
      err => {
        //console.log(err);
        this.openSnackBar("Error en la base de datos. Probar en otro momento", "Aceptar");
      } 
    )
    //console.log(this.registerUserData)
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


  /* Shorthands for form controls (used from within template) */
  get password() { return this.formGroup.get('password'); }
  get password2() { return this.formGroup.get('password2'); }
  get name() { return this.formGroup.get('name'); }
  get email() { return this.formGroup.get('email'); }
  /* Called on each input in either password field */
  onPasswordInput() {
    if (this.formGroup.hasError('passwordMismatch'))
      this.password2.setErrors([{ 'passwordMismatch': true }]);
    else
      this.password2.setErrors(null);
  }
}

export const passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
  if (formGroup.get('password').value === formGroup.get('password2').value)
    return null;
  else
    return { passwordMismatch: true };
};

