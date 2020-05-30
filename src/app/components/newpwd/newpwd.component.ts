import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SingletonService } from '../singleton.service';
import { tokenName } from '@angular/compiler';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';


@Component({
  selector: 'app-newpwd',
  templateUrl: './newpwd.component.html',
  styleUrls: ['./newpwd.component.css']
})

export class NewpwdComponent implements OnInit {
  formGroup: FormGroup;
  passwordPattern: " ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}$";

  constructor(private _auth: AuthService, private _router: Router, private route: ActivatedRoute, private singleton: SingletonService,  private FormBuilder: FormBuilder) { }
  private token: string;


  ngOnInit() {
    // if (!this.singleton.verificarToken()) {
    //   this._router.navigate(['/*']);
    // } else this.token = this.route.snapshot.params['token'];
    this.token = this.route.snapshot.params['token'];

    this.formGroup = this.FormBuilder.group({
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]],
    }, { validator: passwordMatchValidator });

  }

  newPwdData = { password: undefined, password2: undefined}
  data =  this.token;
  

    newPwd() {
    this._auth.newPwd(this.newPwdData, this.token).subscribe(
      
      res => {
        localStorage.removeItem("token");
        this._router.navigate(['/home']);
        
      },
      err => {
        console.log(err)
        
      }
    )
  }


    /* Shorthands for form controls (used from within template) */
  get password() { return this.formGroup.get('password'); }
  get password2() { return this.formGroup.get('password2'); }
 
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
    return { passwordMismatch: true };}
