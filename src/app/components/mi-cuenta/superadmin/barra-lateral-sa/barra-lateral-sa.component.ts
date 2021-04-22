import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-barra-lateral-sa',
  templateUrl: './barra-lateral-sa.component.html',
  styleUrls: ['./barra-lateral-sa.component.css']
})
export class BarraLateralSaComponent implements OnInit {

  constructor(private _auth: AuthService, private spinner: NgxSpinnerService, private _router: Router) { }

  ngOnInit() {
    this.spinner.show();
    this.verificarSuperadmin()
  }

  verificarSuperadmin() {
    if (localStorage.getItem("email") != undefined) {
      let email = localStorage.getItem("email");
      this._auth.user_data(email).subscribe(
        res => {
          if (res.admin == undefined) {
            window.location.assign("/error")
          } else {
            if (res.admin == false) {
              window.location.assign("/error")
            } else {
              this.spinner.hide();
            }
          }
        }
      )
    } else {
      window.location.assign("/error")
    }
  }

  ir(text) {
    let url = decodeURI('/superadmin/estadisticas?est=' + text)   
    this._router.navigateByUrl(url)
  }

  cerrarSesion() {
    localStorage.clear();
    window.location.assign("/home");
  }

}
