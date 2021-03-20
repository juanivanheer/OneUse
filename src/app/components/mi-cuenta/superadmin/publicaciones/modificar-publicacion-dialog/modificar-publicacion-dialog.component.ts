import { Component, OnInit, Inject, ViewChild, NgZone } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-modificar-publicacion-dialog',
  templateUrl: './modificar-publicacion-dialog.component.html',
  styleUrls: ['./modificar-publicacion-dialog.component.css']
})
export class ModificarPublicacionDialogComponent implements OnInit {

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

  public _id: string;
  public titulo: string;
  public categoria: string;
  public subcategoria: string;
  public descripcion: string;
  public preciodia: string;
  public preciosemana: Date;
  public preciomes: string;
  public email: string;
  public multiplefile: string;
  public tipoAlquiler: string;
  public destacar: string;
  public estado: string;
  public createdAt: string;
  public updatedAt: string;
  public __v: string;
  public cantDias: string;
  public cantidadDisponible: string;
  public contadorDeVisita: string;

  datosUsuariosGroup = new FormGroup({
    _id: new FormControl({ value: '', disabled: false }),
    titulo: new FormControl({ value: '', disabled: false }),
    categoria: new FormControl({ value: '', disabled: false }),
    subcategoria: new FormControl({ value: '', disabled: false }),
    descripcion: new FormControl({ value: '', disabled: false }),
    preciodia: new FormControl({ value: '', disabled: false }),
    preciosemana: new FormControl({ value: '', disabled: false }),
    preciomes: new FormControl({ value: '', disabled: false }),
    multiplefile: new FormControl({ value: '', disabled: false }),
    tipoAlquiler: new FormControl({ value: '', disabled: false }),
    destacar: new FormControl({ value: '', disabled: false }),
    estado: new FormControl({ value: '', disabled: false }),
    createdAt: new FormControl({ value: '', disabled: false }),
    updatedAt: new FormControl({ value: '', disabled: false }),
    email: new FormControl({ value: '', disabled: false }),
    __v: new FormControl({ value: '', disabled: false }),
    cantDias: new FormControl({ value: '', disabled: false }),
    cantidadDisponible: new FormControl({ value: '', disabled: false }),
    contadorDeVisita: new FormControl({ value: '', disabled: false }),
  });

  constructor(private dialogRef: MatDialogRef<ModificarPublicacionDialogComponent>, private _auth: AuthService, @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
    this.datos = this.data.data;

    if (this.datos._id == undefined) {
      this.datos._id = 'Sin cargar';
    } else this._id = this.datos._id;

    if (this.datos.titulo == undefined) {
      this.datos.titulo = 'Sin cargar';
    } else this.titulo = this.datos.titulo;

    if (this.datos.categoria == undefined) {
      this.datos.categoria = 'Sin cargar';
    } else this.categoria = this.datos.categoria;

    if (this.datos.subcategoria == undefined) {
      this.datos.subcategoria = 'Sin cargar';
    } else this.subcategoria = this.datos.subcategoria;

    if (this.datos.descripcion == undefined) {
      this.datos.descripcion = 'Sin cargar';
    } else this.descripcion = this.datos.descripcion;

    if (this.datos.preciodia == undefined) {
      this.datos.preciodia = 'Sin cargar';
    } else this.preciodia = this.datos.preciodia;

    if (this.datos.preciosemana == undefined) {
      this.datos.preciosemana = 'Sin cargar';
    } else this.preciosemana = this.datos.preciosemana;

    if (this.datos.preciomes == undefined) {
      this.datos.preciomes = 'Sin cargar';
    } else this.preciomes = this.datos.preciomes;

    if (this.datos.email == undefined) {
      this.datos.email = 'Sin cargar';
    } else this.email = this.datos.email;

    if (this.datos.multiplefile == undefined) {
      this.datos.multiplefile = 'Sin cargar';
    } else this.multiplefile = this.datos.multiplefile;


    if (this.datos.tipoAlquiler == undefined) {
      this.datos.tipoAlquiler = 'Sin cargar';
    } else this.tipoAlquiler = this.datos.tipoAlquiler;


    if (this.datos.destacar == undefined) {
      this.datos.destacar = 'Sin cargar';
    } else this.destacar = this.datos.destacar;


    if (this.datos.estado == undefined) {
      this.datos.estado = 'Sin cargar';
    } else this.estado = this.datos.estado;


    if (this.datos.createdAt == undefined) {
      this.datos.createdAt = '';
    } else this.createdAt = this.datos.createdAt;


    if (this.datos.updatedAt == undefined) {
      this.datos.updatedAt = 'Sin cargar';
    } else this.updatedAt = this.datos.updatedAt;

    if (this.datos.__v == undefined) {
      this.datos.__v = 'Sin cargar';
    } else this.__v = this.datos.__v;


    if (this.datos.cantDias == undefined) {
      this.datos.cantDias = '';
    } else this.cantDias = this.datos.cantDias;


    if (this.datos.cantidadDisponible == undefined) {
      this.datos.cantidadDisponible = 'Sin cargar';
    } else this.cantidadDisponible = this.datos.cantidadDisponible;


    if (this.datos.contadorDeVisita == undefined) {
      this.datos.contadorDeVisita = 'Sin cargar';
    } else this.contadorDeVisita = this.datos.contadorDeVisita;
  }

  modificarPublicacion() {
    this.updateFormularioControl();
    this._auth.update_superadmin_publicacion(this.datosUsuariosGroup.value).subscribe(
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
      titulo: this.titulo,
      categoria: this.categoria,
      subcategoria: this.subcategoria,
      descripcion: this.descripcion,
      preciodia: this.preciodia,
      preciosemana: this.preciosemana,
      preciomes: this.preciomes,
      email: this.email,
      multiplefile: this.multiplefile,
      tipoAlquiler: this.tipoAlquiler,
      destacar: this.destacar,
      estado: this.estado,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      __v: this.__v,
      cantDias: this.cantDias,
      cantidadDisponible: this.cantidadDisponible,
      contadorDeVisita: this.contadorDeVisita,
    })
  }

}
