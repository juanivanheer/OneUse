import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { SingletonService } from '../../singleton.service';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/zip";

export interface Notificacion {
  _id: string,
  id_publicacion: string,
  tituloPublicacion: string,
  imagen: string,
  titulo: string,
  name_origen: string,
  name_destino: string,
  tipo: string,
  mensaje_notificacion: string,
  visto: string,
  createdAt: string,
  updatedAt: string,
  __v: number
}

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  usuarioLogueado;
  notificaciones = [];
  publicacion;
  JSON;
  JSONfinal;
  arrayJSON = [];
  arrayTitulos = [];
  arrayFechas = [];
  date;
  year;
  month;
  dt;
  hayDatos: boolean = false;
  mostrar: boolean = false;
  notificaciones_usuario_logueado = []

  constructor(private singleton: SingletonService, private _auth: AuthService) { }

  ngOnInit() {
    var obsA = this._auth.notificaciones_todas()
    var obsB = this._auth.user_data(localStorage.getItem("email"))
    const obsvArray = [obsA, obsB];
    const zip = Observable.zip(...obsvArray)
    zip.subscribe(
      res => {
        this.notificaciones = res[0];
        this.usuarioLogueado = res[1];

        for (let index = 0; index < this.notificaciones.length; index++) {
          const element = this.notificaciones[index];
          if (element.name_destino == this.usuarioLogueado.name) {
            this.notificaciones_usuario_logueado.push(element)
          }
        }

        if (this.notificaciones_usuario_logueado.length > 1) {
          for (let i = 0; i < this.notificaciones_usuario_logueado.length; i++) {
            const element = this.notificaciones_usuario_logueado[i]
            /* PARA OBTENER FECHAS EN FORMATO AR*/
            this.date = new Date(element.createdAt);
            this.year = this.date.getFullYear();
            this.month = this.date.getMonth() + 1;
            this.dt = this.date.getDate();
            this.arrayFechas.push(this.dt + '-' + this.month + '-' + this.year);
            this.arrayJSON.push(element.imagen);
            this.arrayTitulos.push(element.titulo);
          }
          this.notificaciones_usuario_logueado.reverse();
          this.arrayJSON.reverse();
          this.arrayTitulos.reverse();
          this.arrayFechas.reverse();
          this.hayDatos = true;
          this.mostrar = true;
        } else {
          this.hayDatos = false;
          this.mostrar = true;
        }
      }
    )
  }

  cerrarSesion() {
    this.singleton.cerrarSesion();
  }
}
