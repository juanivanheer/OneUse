import { Component, OnInit, Inject, ViewChild, NgZone } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-modificar-alquiler-dialog',
  templateUrl: './modificar-alquiler-dialog.component.html',
  styleUrls: ['./modificar-alquiler-dialog.component.css']
})
export class ModificarAlquilerDialogComponent implements OnInit {

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

  _id: string
  imagen: string
  fuePagado: string
  estado: string
  id_publicacion: string
  name_usuarioPropietario: string
  name_usuarioLocatario: string
  cantidadDias: string
  cantidadAlquilar: string
  createdAt: string
  updatedAt: string
  __v: string
  codigoEntregaLocatario: string
  codigoEntregaPropietario: string
  codigoLocatarioIngresado: string
  codigoPropietarioIngresado: string
  fechaCaducidadEntrega: string
  codigoDevolucionLocatario: string
  codigoDevolucionPropietario: string
  codigoLocatarioDevolucionIngresado: string
  codigoPropietarioDevolucionIngresado: string
  fechaCaducidadDevolucion: string
  fechaEntrega: string
  fechaDevolucion: string


  datosUsuariosGroup = new FormGroup({
    _id: new FormControl({ value: '', disabled: false }),
    imagen: new FormControl({ value: '', disabled: false }),
    estado: new FormControl({ value: '', disabled: false }),
    id_publicacion: new FormControl({ value: '', disabled: false }),
    fuePagado: new FormControl({ value: '', disabled: false }),
    name_usuarioPropietario: new FormControl({ value: '', disabled: false }),
    name_usuarioLocatario: new FormControl({ value: '', disabled: false }),
    cantidadDias: new FormControl({ value: '', disabled: false }),
    cantidadAlquilar: new FormControl({ value: '', disabled: false }),
    createdAt: new FormControl({ value: '', disabled: false }),
    updatedAt: new FormControl({ value: '', disabled: false }),
    __v: new FormControl({ value: '', disabled: false }),
    codigoEntregaLocatario: new FormControl({ value: '', disabled: false }),
    codigoEntregaPropietario: new FormControl({ value: '', disabled: false }),
    codigoLocatarioIngresado: new FormControl({ value: '', disabled: false }),
    codigoPropietarioIngresado: new FormControl({ value: '', disabled: false }),
    fechaCaducidadEntrega: new FormControl({ value: '', disabled: false }),
    codigoDevolucionLocatario: new FormControl({ value: '', disabled: false }),
    codigoDevolucionPropietario: new FormControl({ value: '', disabled: false }),
    codigoLocatarioDevolucionIngresado: new FormControl({ value: '', disabled: false }),
    codigoPropietarioDevolucionIngresado: new FormControl({ value: '', disabled: false }),
    fechaCaducidadDevolucion: new FormControl({ value: '', disabled: false }),
    fechaEntrega: new FormControl({ value: '', disabled: false }),
    fechaDevolucion: new FormControl({ value: '', disabled: false }),
  });

  constructor(private dialogRef: MatDialogRef<ModificarAlquilerDialogComponent>, private _auth: AuthService, @Inject(MAT_DIALOG_DATA) private data) { }


  ngOnInit() {
    this.datos = this.data.data;

    if (this.datos._id == undefined) {
      this._id = 'Sin cargar';
    } else this._id = this.datos._id;

    if (this.datos.imagen == undefined) {
      this.imagen = 'Sin cargar';
    } else this.imagen = this.datos.imagen;

    if (this.datos.fuePagado == undefined) {
      this.fuePagado = 'Sin cargar';
    } else this.fuePagado = this.datos.fuePagado;

    if (this.datos.estado == undefined) {
      this.estado = 'Sin cargar';
    } else this.estado = this.datos.estado;

    if (this.datos.id_publicacion == undefined) {
      this.id_publicacion = 'Sin cargar';
    } else this.id_publicacion = this.datos.id_publicacion;

    if (this.datos.name_usuarioPropietario == undefined) {
      this.name_usuarioPropietario = 'Sin cargar';
    } else this.name_usuarioPropietario = this.datos.name_usuarioPropietario;

    if (this.datos.name_usuarioLocatario == undefined) {
      this.name_usuarioLocatario = 'Sin cargar';
    } else this.name_usuarioLocatario = this.datos.name_usuarioLocatario;

    if (this.datos.cantidadDias == undefined) {
      this.cantidadDias = 'Sin cargar';
    } else this.cantidadDias = this.datos.cantidadDias;

    if (this.datos.cantidadAlquilar == undefined) {
      this.cantidadAlquilar = 'Sin cargar';
    } else this.cantidadAlquilar = this.datos.cantidadAlquilar;

    if (this.datos.createdAt == undefined) {
      this.createdAt = 'Sin cargar';
    } else this.createdAt = this.datos.createdAt;

    if (this.datos.updatedAt == undefined) {
      this.updatedAt = 'Sin cargar';
    } else this.updatedAt = this.datos.updatedAt;

    if (this.datos.__v == undefined) {
      this.__v = 'Sin cargar';
    } else this.__v = this.datos.__v;

    if (this.datos.codigoEntregaLocatario == undefined) {
      this.codigoEntregaLocatario = 'Sin cargar';
    } else this.codigoEntregaLocatario = this.datos.codigoEntregaLocatario;

    if (this.datos.codigoEntregaPropietario == undefined) {
      this.codigoEntregaPropietario = 'Sin cargar';
    } else this.codigoEntregaPropietario = this.datos.codigoEntregaPropietario;

    if (this.datos.codigoLocatarioIngresado == undefined) {
      this.codigoLocatarioIngresado = 'Sin cargar';
    } else this.codigoLocatarioIngresado = this.datos.codigoLocatarioIngresado;

    if (this.datos.codigoPropietarioIngresado == undefined) {
      this.codigoPropietarioIngresado = 'Sin cargar';
    } else this.codigoPropietarioIngresado = this.datos.codigoPropietarioIngresado;

    if (this.datos.fechaCaducidadEntrega == undefined) {
      this.fechaCaducidadEntrega = 'Sin cargar';
    } else this.fechaCaducidadEntrega = this.datos.fechaCaducidadEntrega;

    if (this.datos.codigoDevolucionLocatario == undefined) {
      this.codigoDevolucionLocatario = 'Sin cargar';
    } else this.codigoDevolucionLocatario = this.datos.codigoDevolucionLocatario;

    if (this.datos.codigoDevolucionPropietario == undefined) {
      this.codigoDevolucionPropietario = 'Sin cargar';
    } else this.codigoDevolucionPropietario = this.datos.codigoDevolucionPropietario;

    if (this.datos.codigoLocatarioDevolucionIngresado == undefined) {
      this.codigoLocatarioDevolucionIngresado = 'Sin cargar';
    } else this.codigoLocatarioDevolucionIngresado = this.datos.codigoLocatarioDevolucionIngresado;

    if (this.datos.codigoPropietarioDevolucionIngresado == undefined) {
      this.codigoPropietarioDevolucionIngresado = 'Sin cargar';
    } else this.codigoPropietarioDevolucionIngresado = this.datos.codigoPropietarioDevolucionIngresado;

    if (this.datos.fechaCaducidadDevolucion == undefined) {
      this.fechaCaducidadDevolucion = 'Sin cargar';
    } else this.fechaCaducidadDevolucion = this.datos.fechaCaducidadDevolucion;

    if (this.datos.fechaEntrega == undefined) {
      this.fechaEntrega = 'Sin cargar';
    } else this.fechaEntrega = this.datos.fechaEntrega;

    if (this.datos.fechaDevolucion == undefined) {
      this.fechaDevolucion = 'Sin cargar';
    } else this.fechaDevolucion = this.datos.fechaDevolucion;
  }

  modificarAlquiler() {
    this.updateFormularioControl();
    this._auth.update_superadmin_alquiler(this.datosUsuariosGroup.value).subscribe(
      err => {
        this.dialogRef.close();
      },
      res => {
        this.dialogRef.close();
      }
    )
  }

  close() {
    this.dialogRef.close();
  }


  updateFormularioControl() {
    this.datosUsuariosGroup.patchValue({
      _id: this._id,
      imagen: this.imagen,
      fuePagado: this.fuePagado,
      estado: this.estado,
      id_publicacion: this.id_publicacion,
      name_usuarioPropietario: this.name_usuarioPropietario,
      name_usuarioLocatario: this.name_usuarioLocatario,
      cantidadDias: this.cantidadDias,
      cantidadAlquilar: this.cantidadAlquilar,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      __v: this.__v,
      codigoEntregaLocatario: this.codigoEntregaLocatario,
      codigoEntregaPropietario: this.codigoEntregaPropietario,
      codigoLocatarioIngresado: this.codigoLocatarioIngresado,
      codigoPropietarioIngresado: this.codigoPropietarioIngresado,
      fechaCaducidadEntrega: this.fechaCaducidadEntrega,
      codigoDevolucionLocatario: this.codigoDevolucionLocatario,
      codigoDevolucionPropietario: this.codigoDevolucionPropietario,
      codigoLocatarioDevolucionIngresado: this.codigoLocatarioDevolucionIngresado,
      codigoPropietarioDevolucionIngresado: this.codigoPropietarioDevolucionIngresado,
      fechaCaducidadDevolucion: this.fechaCaducidadDevolucion,
      fechaEntrega: this.fechaEntrega,
      fechaDevolucion: this.fechaDevolucion,
    })
  }

}
