import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { DataTableDataSource } from './data-table-datasource';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { SingletonService } from '../../singleton.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private subscription: Subscription;

  dataSource: DataTableDataSource;
  displayedColumns = ['id']; /* ,'name', 'amount' */
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

  constructor(private singleton: SingletonService, private _auth: AuthService) { }

  ngOnInit() {
    this.subscription = this._auth.user_data(localStorage.getItem("email")).subscribe(
      res1 => {
        this._auth.notificaciones_todas(res1.name).subscribe(
          res2 => {
            for (let i = 0; i < res2.not.length; i++) {
              /* PARA OBTENER FECHAS EN FORMATO AR*/
              this.date = new Date(res2.not[i].createdAt);
              this.year = this.date.getFullYear();
              this.month = this.date.getMonth() + 1;
              this.dt = this.date.getDate();
              this.arrayFechas.push(this.dt + '-' + this.month + '-' + this.year);
              this.arrayJSON.push(res2.not[i].imagen);
              this.arrayTitulos.push(res2.not[i].titulo);
            }
            this.notificaciones = res2.not;
            this.notificaciones.reverse();
            this.arrayJSON.reverse();
            this.arrayTitulos.reverse();
            this.arrayFechas.reverse();
            this.dataSource = new DataTableDataSource(this.paginator, this.sort, this.notificaciones, this.arrayJSON, this.arrayTitulos, this.arrayFechas);
          }
        )
      }
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  cerrarSesion() {
    this.singleton.cerrarSesion();
  }
}
