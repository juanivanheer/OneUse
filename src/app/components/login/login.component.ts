import { Component, OnInit, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { SingletonService } from '../singleton.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare const gapi: any;
declare const FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('recaptcha', { static: true }) recaptchaElement: ElementRef;
  loginUserData = { email: undefined, password: undefined, tipo: 'oneuse' }
  estado: boolean;
  public auth2: any;
  recaptcha: boolean = false;
  btn_habilitado: boolean = false;


  constructor(private http: HttpClient, private _auth: AuthService, private _router: Router, private _snackBar: MatSnackBar, private singleton: SingletonService) { }

  ngOnInit() {
    this.addRecaptchaScript();
    setTimeout(() => {
      document.getElementsByTagName("span")[17].textContent = "Acceder con Google";
    }, 600);
  }

  ngAfterViewInit() {
    this.googleInit();
    this.facebookInit();
    console.log(gapi);
    console.log(FB);
  }

  lostPassword() {
    window.location.assign("/lostpassword")
  }

  register() {
    window.location.assign("/register")
  }

  /* INICIO DE SESIÓN FACEBOOK */
  public facebookInit() {
    (window as any).fbAsyncInit = function () {
      window['FB'].init({
        appId: '235541454927521',
        cookie: true,
        xfbml: true,
        version: 'v3.1'
      });
      window['FB'].AppEvents.logPageView();
    };
  }

  public loginFacebook() {
    window['FB'].login((response) => {
      //console.log('login response', response);
      if (response.authResponse) {
        window['FB'].api('/me', { fields: 'last_name, first_name, email' }, (userInfo) => {
          let access_token = response.authResponse.accessToken;
          let id = response.authResponse.userID;
          let nombre = userInfo.first_name;
          let email = userInfo.email;
          let apellido = userInfo.last_name;
          let name = String(email).slice(0, String(email).indexOf("@")).toUpperCase();
          let imagen = 'https://graph.facebook.com/v10.0/' + id + '/picture?access_token=' + access_token + '&heigth=150&width=150';

          let objeto = {
            name: name,
            nombre: nombre,
            apellido: apellido,
            email: email,
            removablefile: imagen,
            tipo: "facebook"
          }

          this._auth.get_all_users().subscribe(
            res => {
              let usuarios = res;
              var existe: boolean = false;
              for (let i = 0; i < usuarios.length; i++) {
                const element = usuarios[i];
                if (element.email == email) {
                  existe = true;
                }
              }
              if (existe) {
                window.localStorage.setItem("email", email);
                window.localStorage.setItem("access_token", access_token);
                window.localStorage.setItem("id", id);
                window.location.assign('/home');
              } else {
                this._auth.registerFacebookUser(objeto).subscribe(
                  res => {
                    window.localStorage.setItem("email", res.email);
                    window.localStorage.setItem("access_token", access_token);
                    window.localStorage.setItem("id", id);
                    window.location.assign('/home');
                  })
              }
            }
          )
          //console.log(objeto);
        });
      } else {
        console.log('User login failed');
      }
    }, { scope: 'email' });
  }

  /* INICIO DE SESIÓN GOOGLE */
  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '357971012144-n2br5dhgv836v0iupchdmhd4r6hl52f7.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }


  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        //console.log(googleUser);
        let profile = googleUser.getBasicProfile();
        //console.log(profile)

        let token = googleUser.getAuthResponse().id_token;
        let id = profile.getId();
        let nombre = profile.getGivenName();
        let apellido = profile.getFamilyName();
        let imagen = profile.getImageUrl();
        let email = profile.getEmail();
        let name = String(email).slice(0, String(email).indexOf("@")).toUpperCase();

        let objeto = {
          name: name,
          nombre: nombre,
          apellido: apellido,
          email: email,
          removablefile: imagen,
          tipo: "google"
        }

        /* console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        */

        this._auth.get_all_users().subscribe(
          res => {
            let usuarios = res;
            var existe: boolean = false;
            for (let i = 0; i < usuarios.length; i++) {
              const element = usuarios[i];
              if (element.email == email) {
                existe = true;
              }
            }
            if (existe) {
              window.localStorage.setItem("email", email);
              window.localStorage.setItem("token", token);
              window.localStorage.setItem("id", id);
              window.location.assign('/home');
            } else {
              this._auth.registerGoogleUser(objeto).subscribe(
                res => {
                  window.localStorage.setItem("email", res.email);
                  window.localStorage.setItem("token", token);
                  window.localStorage.setItem("id", id);
                  window.location.assign('/home');
                })
            }
          }
        )
      }, (error) => {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }



  /* INICIO DE SESIÓN ONEUSE */
  iniciarSesion() {
    this.singleton.setInicioSesion(true);
    this._auth.loginUser(this.loginUserData).subscribe(
      res => {
        //console.log(res);
        window.localStorage.setItem("email", this.loginUserData.email);
        window.localStorage.setItem("token", res.token)
        window.location.assign('/home');
      }
    )
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 8000,
      panelClass: ['color-snackbar']
    });
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
            this.habilitarInicio();
          },
          err => {
            console.log(err)
          }
        )
        this.habilitarInicio();
      },
      'expired-callback': (response) => {
        if (response == undefined) { }
        this.recaptcha = false;
        this.habilitarInicio();
      }
    });
    this.habilitarInicio();
  }

  habilitarInicio() {
    if (this.loginUserData.email != undefined && this.loginUserData.password != undefined) {
      if (this.recaptcha == true) {
        this.btn_habilitado = true;
        document.querySelectorAll("button")[10].disabled = false;
      }
      else {
        this.btn_habilitado = false;
        document.querySelectorAll("button")[10].disabled = true;
      }
    } else {
      this.btn_habilitado = false;
      document.querySelectorAll("button")[10].disabled = true;
    }
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
