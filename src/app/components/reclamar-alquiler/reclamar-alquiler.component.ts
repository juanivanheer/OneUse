import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatTabChangeEvent } from '@angular/material';
//import cancelaciones from './cancelaciones.json';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { SingletonService } from '../singleton.service';
import motivos from './motivos.json';
import { take } from 'rxjs/operators';

declare var require: any;
var sortJsonArray = require('sort-json-array');


export interface Motivos {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-confirmacion',
  templateUrl: './reclamar-alquiler.component.html',
  styleUrls: ['./reclamar-alquiler.component.css']

})
export class ReclamarAlquilerComponent implements OnInit {

  //Para traer los datos de la BD en el form
  public user = {};
  emailLogueado = localStorage.getItem("email");

  //Para armar JSON
  hoy = new Date();
  motivosCancelacion: Motivos[];
  reclamoData = { tipo: undefined, motivo: undefined, usuario_reclamo: this.emailLogueado, 
    codigoLocatarioDevolucionIngresado: undefined,
    codigoLocatarioIngresado: undefined,
    codigoPropietarioDevolucionIngresado: undefined,
    codigoPropietarioIngresado: undefined,
    id_publicacion:undefined,
    estado_reclamo: undefined,
    imagen: undefined,
    respuestas: 
    [] 
  } 
  datosAlquiler: any;

  constructor(private _auth: AuthService, private singletoon: SingletonService, private _snackBar: MatSnackBar, private _adapter: DateAdapter<any>, private singleton: SingletonService, private _router: Router) { }

  ngOnInit() {
    if (this.verificarInicioSesion() == false) {
      return;
    }
    this._auth.datosAlquiler.pipe(take(1))
    .subscribe(mensaje => this.datosAlquiler = mensaje);
    console.log(this.datosAlquiler);
    this.crearJSONmotivos();
  }

  cerrarSesion() {
    this.singletoon.cerrarSesion();
  }

  verificarInicioSesion(): boolean {
    if (this.singleton.getInicioSesion() == false) {
      this._router.navigate(['/*']);
      return false;
    }
    return true;
  }

  reclamar() {

    
    this._auth.datosAlquiler.pipe(take(1))
    .subscribe(mensaje => this.datosAlquiler = mensaje);
    let motivo = this.reclamoData.motivo
    let tipo = this.reclamoData.tipo

    this.reclamoData = { tipo: tipo, motivo: motivo, usuario_reclamo: this.emailLogueado, 
      codigoLocatarioDevolucionIngresado: this.datosAlquiler.codigoLocatarioDevolucionIngresado,
      codigoLocatarioIngresado: this.datosAlquiler.codigoLocatarioIngresado,
      codigoPropietarioDevolucionIngresado: this.datosAlquiler.codigoPropietarioDevolucionIngresado,
      codigoPropietarioIngresado: this.datosAlquiler.codigoPropietarioIngresado,
      id_publicacion:this.datosAlquiler.id_publicacion,
      estado_reclamo: 'Esperando respuesta del sitio',
      imagen: this.datosAlquiler.imagen,
      respuestas: [{
        emisor_respuesta: this.emailLogueado,
        respuesta: motivo,
        nro_rta: 1
    
        }] 
    }
    console.log(this.reclamoData) 

    this._auth.registrar_reclamo(this.reclamoData).subscribe(
      
      res => {
        
      },
      err => {
        console.log(err)
        
      }
    )

    this._auth.registrar_reclamado(this.datosAlquiler._id).subscribe(
      res => {
        
      },
      err => {
        console.log(err)
        
      }


    )
    this._router.navigate(['/reclamo-exito']);
  }

  crearJSONmotivos() {
    let index, JSONmotivos = motivos;
    let arreglo = [];
    for (index in JSONmotivos) {
      arreglo.push({ 'value': JSONmotivos[index].id, 'viewValue': JSONmotivos[index].descripción })
    }
    this.motivosCancelacion = sortJsonArray(arreglo, 'value', 'asc');
  }


}



