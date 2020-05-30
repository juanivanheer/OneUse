import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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

  constructor(private singleton: SingletonService, private elementRef: ElementRef) { }

  ngOnInit() {
  }

  cerrarSesion() {
    this.singleton.cerrarSesion();
  }

  botones: Botones[] = [
    { icono: "account_box", texto: "Usuarios", link: "/mi-cuenta/superadmin/usuarios" },
    { icono: "storefront", texto: "Publicaciones", link: "/mi-cuenta/superadmin/publicaciones" },
    { icono: "dashboard", texto: "Alquileres", link: "/mi-cuenta/superadmin/alquileres" },
    { icono: "menu_book", texto: "Reclamos", link: "/mi-cuenta/superadmin/reclamos" },
    { icono: "assessment", texto: "Estadísticas", link: "/mi-cuenta/superadmin/estadisticas" },
    { icono: "exit_to_app", texto: "Salir", link: "" },
  ]

}
