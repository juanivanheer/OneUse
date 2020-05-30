import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-datos-alquileres-dialog',
  templateUrl: './datos-alquileres-dialog.component.html',
  styleUrls: ['./datos-alquileres-dialog.component.css']
})
export class DatosAlquileresDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DatosAlquileresDialogComponent>, private _auth: AuthService, @Inject(MAT_DIALOG_DATA) private data) { }


  datos = {
    _id: undefined,
    imagen: undefined,
    fuePagado: undefined,
    estado: undefined,
    id_publicacion: undefined,
    name_usuarioPropietario: undefined,
    name_usuarioLocatario: undefined,
    cantidadDias: undefined,
    cantidadAlquilar: undefined,
    createdAt: undefined,
    updatedAt: undefined,
    __v: undefined,
    codigoEntregaLocatario: undefined,
    codigoEntregaPropietario: undefined,
    codigoLocatarioIngresado: undefined,
    codigoPropietarioIngresado: undefined,
    fechaCaducidadEntrega: undefined,
    codigoDevolucionLocatario: undefined,
    codigoDevolucionPropietario: undefined,
    codigoLocatarioDevolucionIngresado: undefined,
    codigoPropietarioDevolucionIngresado: undefined,
    fechaCaducidadDevolucion: undefined,
    fechaEntrega: undefined,
    fechaDevolucion: undefined,
  };

  ngOnInit() {
    this._auth.get_alquiler_id(this.data.data._id).subscribe(
      res => {
        this.datos = res;

        if (this.datos._id == undefined) {
          this.datos._id = 'Sin cargar';
        }

        if (this.datos.imagen == undefined) {
          this.datos.imagen = 'Sin cargar';
        }

        if (this.datos.fuePagado == undefined) {
          this.datos.fuePagado = 'Sin cargar';
        }

        if (this.datos.estado == undefined) {
          this.datos.estado = 'Sin cargar';
        }

        if (this.datos.id_publicacion == undefined) {
          this.datos.id_publicacion = 'Sin cargar';
        }

        if (this.datos.name_usuarioPropietario == undefined) {
          this.datos.name_usuarioPropietario = '';
        }

        if (this.datos.name_usuarioLocatario == undefined) {
          this.datos.name_usuarioLocatario = 'Sin cargar';
        }

        if (this.datos.cantidadDias == undefined) {
          this.datos.cantidadDias = 'Sin cargar';
        }

        if (this.datos.cantidadAlquilar == undefined) {
          this.datos.cantidadAlquilar = '';
        }

        if (this.datos.createdAt == undefined) {
          this.datos.createdAt = 'Sin cargar';
        }

        if (this.datos.updatedAt == undefined) {
          this.datos.updatedAt = '';
        }

        if (this.datos.__v == undefined) {
          this.datos.__v = ' ';
        }

        if (this.datos.codigoEntregaLocatario == undefined) {
          this.datos.codigoEntregaLocatario = 'Sin cargar';
        }

        if (this.datos.codigoEntregaPropietario == undefined) {
          this.datos.codigoEntregaPropietario = 'Sin cargar';
        }

        if (this.datos.codigoLocatarioIngresado == undefined) {
          this.datos.codigoLocatarioIngresado = 'Sin cargar';
        }

        if (this.datos.codigoPropietarioIngresado == undefined) {
          this.datos.codigoPropietarioIngresado = 'Sin cargar';
        }

        if (this.datos.fechaCaducidadEntrega == undefined) {
          this.datos.fechaCaducidadEntrega = 'Sin cargar';
        }
        
        if (this.datos.codigoDevolucionLocatario == undefined) {
          this.datos.codigoDevolucionLocatario = 'Sin cargar';
        }

        if (this.datos.codigoDevolucionPropietario == undefined) {
          this.datos.codigoDevolucionPropietario = 'Sin cargar';
        }

        if (this.datos.codigoLocatarioDevolucionIngresado == undefined) {
          this.datos.codigoLocatarioDevolucionIngresado = 'Sin cargar';
        }

        if (this.datos.codigoPropietarioDevolucionIngresado == undefined) {
          this.datos.codigoPropietarioDevolucionIngresado = 'Sin cargar';
        }

        if (this.datos.fechaCaducidadDevolucion == undefined) {
          this.datos.fechaCaducidadDevolucion = 'Sin cargar';
        }

        if (this.datos.fechaEntrega == undefined) {
          this.datos.fechaEntrega = 'Sin cargar';
        }

        if (this.datos.fechaDevolucion == undefined) {
          this.datos.fechaDevolucion = 'Sin cargar';
        }
      }
    )
  }

  close() {
    this.dialogRef.close();
  }

}
