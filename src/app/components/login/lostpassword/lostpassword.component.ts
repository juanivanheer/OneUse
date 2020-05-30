import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { SingletonService } from '../../singleton.service';

@Component({
  selector: 'lostpassword',
  templateUrl: './lostpassword.component.html',
  styleUrls: ['./lostpassword.component.css']
})
export class LostPasswordComponent implements OnInit {

  mailPasswordData = { email: undefined }
  constructor(private _auth: AuthService, private _router: Router, private _snackBar: MatSnackBar, private singleton: SingletonService) { }
  estado: boolean;

  ngOnInit() {

  }

 
  mailPassword() {
    this._auth.mailPassword(this.mailPasswordData).subscribe( 
      res => {
         this._router.navigate(['/confirmalostpassword']);
        },
      err => {
        
        this.openSnackBar(err.error, "Aceptar");
      }
    )
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
