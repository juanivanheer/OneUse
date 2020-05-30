import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { SingletonService } from '../singleton.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = { email: undefined, password: undefined }
  constructor(private _auth: AuthService, private _router: Router, private _snackBar: MatSnackBar, private singleton: SingletonService) { }
  estado: boolean;

  ngOnInit() {

  }

  loginUser() {
    this._auth.loginUser(this.loginUserData).subscribe(
      res => {
        localStorage.setItem('token', res.token)
        localStorage.setItem('email', this.loginUserData.email)
        this.estado = true;
        //this._router.navigate(['/home']);
        this.iniciarSesion();
      },
      err => {
        this.estado = false;
        this.openSnackBar(err.error, "Aceptar");
      }
    )
  }

  iniciarSesion() {
    if (this.estado) {
      this.singleton.setInicioSesion(true);
      window.location.assign('/home');
    } else this.singleton.setInicioSesion(false);
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 8000,
      panelClass: ['color-snackbar']
    });
  }

  // onLogin(form): void {
  //  // this.authServices.login(form.value).subscribe(res => {
  //     this.router.navigateByUrl('/login');
  //   });
  // }

  //Variables y métodos para los inputs/forms
  value1 = '';
  hide = true;





}
