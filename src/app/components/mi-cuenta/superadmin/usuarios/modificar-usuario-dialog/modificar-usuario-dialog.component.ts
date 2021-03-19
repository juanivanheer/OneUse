import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-modificar-usuario-dialog',
  templateUrl: './modificar-usuario-dialog.component.html',
  styleUrls: ['./modificar-usuario-dialog.component.css']
})
export class ModificarUsuarioDialogComponent implements OnInit {

  datos = {
    _id: undefined,
    tipo: undefined,
    name: undefined,
    email: undefined,
    confirmed: undefined,
    createdAt: undefined,
    updatedAt: undefined,
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
    codArea: undefined,
    password: undefined
  };

  public _id: string;
  public tipo: string;
  public name: string;
  public email: string;
  public password: string;
  public confirmed: number;
  public createdAt: number;
  public updatedAt: Date;
  public apellido: string;
  public barrio: string;
  public calle: string;
  public ciudad: string;
  public codArea: number;
  public codigoPostal: number;
  public departamento: string;
  public fecha_nacimiento: number;
  public nombre: string;
  public numero: string;
  public piso: string;
  public provincia: string;
  public telefono: string;
  public removableFile: string;

  datosUsuariosGroup = new FormGroup({
    _id: new FormControl({ value: '', disabled: false }),
    tipo: new FormControl({ value: '', disabled: false }),
    name: new FormControl({ value: '', disabled: false }),
    email: new FormControl({ value: '', disabled: false }),
    password: new FormControl({ value: '', disabled: false }),
    confirmed: new FormControl({ value: '', disabled: false }),
    createdAt: new FormControl({ value: '', disabled: false }),
    updatedAt: new FormControl({ value: '', disabled: false }),
    apellido: new FormControl({ value: '', disabled: false }),
    barrio: new FormControl({ value: '', disabled: false }),
    calle: new FormControl({ value: '', disabled: false }),
    ciudad: new FormControl({ value: '', disabled: false }),
    codArea: new FormControl({ value: '', disabled: false }),
    codigoPostal: new FormControl({ value: '', disabled: false }),
    departamento: new FormControl({ value: '', disabled: false }),
    fecha_nacimiento: new FormControl({ value: '', disabled: false }),
    nombre: new FormControl({ value: '', disabled: false }),
    numero: new FormControl({ value: '', disabled: false }),
    piso: new FormControl({ value: '', disabled: false }),
    provincia: new FormControl({ value: '', disabled: false }),
    telefono: new FormControl({ value: '', disabled: false }),
    removableFile: new FormControl({ value: '', disabled: false })
  });

  constructor(private dialogRef: MatDialogRef<ModificarUsuarioDialogComponent>, private _auth: AuthService, @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
    this.datos = this.data.data;

    if (this.datos._id == undefined) {
      this.datos._id = 'Sin cargar';
    } else this._id = this.datos._id;

    if (this.datos.tipo == undefined) {
      this.datos.tipo = 'Sin cargar';
    } else this.tipo = this.datos.tipo;

    if (this.datos.password == undefined) {
      this.datos.password = 'Sin cargar';
    } else this.password = this.datos.password;

    if (this.datos.confirmed == undefined) {
      this.datos.confirmed = 'Sin cargar';
    } else this.confirmed = this.datos.confirmed;

    if (this.datos.name == undefined) {
      this.datos.name = 'Sin cargar';
    } else this.name = this.datos.name;

    if (this.datos.createdAt == undefined) {
      this.datos.createdAt = 'Sin cargar';
    } else this.createdAt = this.datos.createdAt;

    if (this.datos.updatedAt == undefined) {
      this.datos.updatedAt = 'Sin cargar';
    } else this.updatedAt = this.datos.updatedAt;

    if (this.datos.tipo == undefined) {
      this.datos.tipo = 'Sin cargar';
    } else this.tipo = this.datos.tipo;

    if (this.datos.email == undefined) {
      this.datos.email = 'Sin cargar';
    } else this.email = this.datos.email;

    if (this.datos.apellido == undefined) {
      this.datos.apellido = 'Sin cargar';
    } else this.apellido = this.datos.apellido;

    if (this.datos.ciudad == undefined) {
      this.datos.ciudad = 'Sin cargar';
    } else this.ciudad = this.datos.ciudad;


    if (this.datos.fecha_nacimiento == undefined) {
      this.datos.fecha_nacimiento = 'Sin cargar';
    } else this.fecha_nacimiento = this.datos.fecha_nacimiento;


    if (this.datos.nombre == undefined) {
      this.datos.nombre = 'Sin cargar';
    } else this.nombre = this.datos.nombre;


    if (this.datos.provincia == undefined) {
      this.datos.provincia = 'Sin cargar';
    } else this.provincia = this.datos.provincia;


    if (this.datos.telefono == undefined) {
      this.datos.telefono = '';
    } else this.telefono = this.datos.telefono;


    if (this.datos.removablefile == undefined) {
      this.datos.removablefile = 'Sin cargar';
    }


    if (this.datos.calle == undefined) {
      this.datos.calle = 'Sin cargar';
    } else this.calle = this.datos.calle;


    if (this.datos.codigoPostal == undefined) {
      this.datos.codigoPostal = '';
    } else this.codigoPostal = this.datos.codigoPostal;


    if (this.datos.departamento == undefined) {
      this.datos.departamento = 'Sin cargar';
    } else this.departamento = this.datos.departamento;


    if (this.datos.numero == undefined) {
      this.datos.numero = '';
    } else this.numero = this.datos.numero;


    if (this.datos.piso == undefined) {
      this.datos.piso = ' ';
    } else this.piso = this.datos.piso;


    if (this.datos.barrio == undefined) {
      this.datos.barrio = 'Sin cargar';
    } else this.barrio = this.datos.barrio;


    if (this.datos.codArea == undefined) {
      this.datos.codArea = 'Sin cargar';
    } else this.codArea = this.datos.codArea;
  }

  modificarUsuario() {
    this.updateFormularioControl();
    this._auth.update_superadmin_user(this.datosUsuariosGroup.value).subscribe(
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
      password: this.password,
      confirmed: this.confirmed,
      tipo: this.tipo,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      name: this.name,
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      codArea: this.codArea,
      telefono: this.telefono,
      fecha_nacimiento: this.fecha_nacimiento,
      provincia: this.provincia,
      barrio: this.barrio,
      ciudad: this.ciudad,
      removableFile: null,
      calle: this.calle,
      numero: this.numero,
      piso: this.piso,
      departamento: this.departamento,
      codigoPostal: this.codigoPostal
    })
  }

}
