import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-datos-publicaciones-dialog',
  templateUrl: './datos-publicaciones-dialog.component.html',
  styleUrls: ['./datos-publicaciones-dialog.component.css']
})
export class DatosPublicacionesDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DatosPublicacionesDialogComponent>, private _auth: AuthService, @Inject(MAT_DIALOG_DATA) private data) { }
  
  datos = {
    _id: undefined,
    titulo: undefined,
    categoria: undefined,
    subcategoria: undefined,
    descripcion: undefined,
    preciodia: undefined,
    preciosemana: undefined,
    preciomes: undefined,
    email: undefined,
    multiplefile: undefined,
    tipoAlquiler: undefined,
    destacar: undefined,
    estado: undefined,
    createdAt: undefined,
    updatedAt: undefined,
    __v: undefined,
    cantDias: undefined,
    cantidadDisponible: undefined,
    contadorDeVisita: undefined,
  };

  ngOnInit() {
    this._auth.get_publicacion_id(this.data.data._id).subscribe(
      res => {
        this.datos = res;

        if (this.datos._id == undefined) {
          this.datos._id = 'Sin cargar';
        }

        if (this.datos.titulo == undefined) {
          this.datos.titulo = 'Sin cargar';
        }

        if (this.datos.categoria == undefined) {
          this.datos.categoria = 'Sin cargar';
        }

        if (this.datos.subcategoria == undefined) {
          this.datos.subcategoria = 'Sin cargar';
        }

        if (this.datos.descripcion == undefined) {
          this.datos.descripcion = 'Sin cargar';
        }

        if (this.datos.preciodia == undefined) {
          this.datos.preciodia = '';
        }

        if (this.datos.preciosemana == undefined) {
          this.datos.preciosemana = 'Sin cargar';
        }

        if (this.datos.preciomes == undefined) {
          this.datos.preciomes = 'Sin cargar';
        }

        if (this.datos.email == undefined) {
          this.datos.email = '';
        }

        if (this.datos.multiplefile == undefined) {
          this.datos.multiplefile = 'Sin cargar';
        }

        if (this.datos.tipoAlquiler == undefined) {
          this.datos.tipoAlquiler = '';
        }

        if (this.datos.destacar == undefined) {
          this.datos.destacar = ' ';
        }

        if (this.datos.estado == undefined) {
          this.datos.estado = 'Sin cargar';
        }

        if (this.datos.cantDias == undefined) {
          this.datos.cantDias = 'Sin cargar';
        }

        if (this.datos.cantidadDisponible == undefined) {
          this.datos.cantidadDisponible = 'Sin cargar';
        }

        if (this.datos.contadorDeVisita == undefined) {
          this.datos.contadorDeVisita = 'Sin cargar';
        }
      }
    )
  }

  close() {
    this.dialogRef.close();
  }

}
