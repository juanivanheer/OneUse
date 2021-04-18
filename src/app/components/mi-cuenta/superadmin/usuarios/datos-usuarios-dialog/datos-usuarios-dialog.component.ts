import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-datos-usuarios-dialog',
  templateUrl: './datos-usuarios-dialog.component.html',
  styleUrls: ['./datos-usuarios-dialog.component.css']
})
export class DatosUsuariosDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DatosUsuariosDialogComponent>, private _auth: AuthService, @Inject(MAT_DIALOG_DATA) private data) { }
  datos = {
    _id: undefined,
    name: undefined,
    email: undefined,
    confirmed: undefined,
    createdAt: undefined,
    updatedAt: undefined,
    __v: undefined,
    apellido: undefined,
    ciudad: undefined,
    fecha_nacimiento: undefined,
    nombre: undefined,
    provincia: undefined,
    telefono: undefined,
    removablefile: undefined,
    calle: undefined,
    codigoPostal: undefined,
    departamento: undefined,
    numero: undefined,
    piso: undefined,
    barrio: undefined,
    codArea: undefined
  };

  mostrar = false;

  ngOnInit() {
    this._auth.user_data(this.data.data.email).subscribe(
      res => {
        this.datos = res;
        if (this.datos.apellido == undefined) {
          this.datos.apellido = 'Sin cargar';
        }
        if (this.datos.ciudad == undefined) {
          this.datos.ciudad = 'Sin cargar';
        }
        if (this.datos.fecha_nacimiento == undefined) {
          this.datos.fecha_nacimiento = 'Sin cargar';
        } else {
          let fecha = new Date(this.datos.fecha_nacimiento);
          let fecha_formatted = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear()
          this.datos.fecha_nacimiento = fecha_formatted;
        }
        if (this.datos.nombre == undefined) {
          this.datos.nombre = 'Sin cargar';
        }
        if (this.datos.provincia == undefined) {
          this.datos.provincia = 'Sin cargar';
        }
        if (this.datos.telefono == undefined) {
          this.datos.telefono = '';
        }
        if (this.datos.removablefile == undefined) {
          this.datos.removablefile = 'Sin cargar';
        }
        if (this.datos.calle == undefined) {
          this.datos.calle = 'Sin cargar';
        }
        if (this.datos.codigoPostal == undefined) {
          this.datos.codigoPostal = '';
        }
        if (this.datos.departamento == undefined) {
          this.datos.departamento = 'Sin cargar';
        }
        if (this.datos.numero == undefined) {
          this.datos.numero = '';
        }
        if (this.datos.piso == undefined) {
          this.datos.piso = ' ';
        }
        if (this.datos.barrio == undefined) {
          this.datos.barrio = 'Sin cargar';
        }
        if (this.datos.codArea == undefined) {
          this.datos.codArea = 'Sin cargar';
        }
        this.mostrar = true;
      }
    )
  }

  close() {
    this.dialogRef.close();
  }

}
