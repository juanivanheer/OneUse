import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { SingletonService } from '../../singleton.service';

export interface Botones {
  icono: string,
  texto: string,
  link: string,
}

@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.css']
})
export class SuperadminComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, private route: Router, private _auth: AuthService) { }

  verificado = false;

  ngOnInit() {
    this.verificarSuperadmin();
  }

  verificarSuperadmin() {
    if (localStorage.getItem("email") != undefined) {
      let email = localStorage.getItem("email");
      this._auth.user_data(email).subscribe(
        res => {
          if (res.admin == undefined) {
            window.location.assign("/error")
          } else {
            if (res.admin == true) {
              this.verificado = true;
            } else {
              this.verificado = false;
            }
          }
          this.spinner.hide();
        }
      )
    } else {
      window.location.assign("/error")
    }
  }

  redirigir(url){
    this.route.navigateByUrl(url)
  }

  botones: Botones[] = [
    { icono: "dashboard", texto: "Alquileres", link: "/superadmin/alquileres" },
    { icono: "report", texto: "Denuncias", link: "/superadmin/denuncias" },
    { icono: "assessment", texto: "Estadísticas", link: "/superadmin/estadisticas?est=alquiler-categoria" },
    { icono: "storefront", texto: "Publicaciones", link: "/superadmin/publicaciones" },
    { icono: "menu_book", texto: "Reclamos", link: "/superadmin/reclamos" },
    { icono: "account_box", texto: "Usuarios", link: "/superadmin/usuarios" },
    { icono: "exit_to_app", texto: "Salir", link: "/home" }
  ]

  //{ icono: "credit_score", texto: "Pagos", link: "/superadmin/pagos"},

}
