import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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

  constructor(private spinner: NgxSpinnerService, private singleton: SingletonService, private _auth: AuthService) { }

  verificado = false;

  ngOnInit() {
    this.verificarSuperadmin();
  }

  verificarSuperadmin() {
    if (localStorage.getItem("email") != undefined) {
      let email = localStorage.getItem("email");
      this._auth.user_data(email).subscribe(
        res => {
          if (res.admin == false){
            window.location.assign("/error")
          } else {
            this.spinner.hide();
            this.verificado = true;
          }
        }
      )
    } else {
      window.location.assign("/error")
    }
  }

  cerrarSesion() {
    this.singleton.cerrarSesion();
  }

  botones: Botones[] = [
    { icono: "account_box", texto: "Usuarios", link: "/superadmin/usuarios" },
    { icono: "storefront", texto: "Publicaciones", link: "/superadmin/publicaciones" },
    { icono: "dashboard", texto: "Alquileres", link: "/superadmin/alquileres" },
    { icono: "menu_book", texto: "Reclamos", link: "/superadmin/reclamos" },
    { icono: "assessment", texto: "Estadísticas", link: "/superadmin/estadisticas" },
    { icono: "exit_to_app", texto: "Salir", link: "" },
  ]

}
