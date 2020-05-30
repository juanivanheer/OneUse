import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatTabChangeEvent } from '@angular/material';
//import cancelaciones from './cancelaciones.json';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { SingletonService } from '../singleton.service';
import { UploadService } from '../../services/upload.service';
import motivos from './motivos.json';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
//import { CancelarDialogComponent } from './cancelar-dialog/cancelar-dialog.component'
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

declare var require: any;
var sortJsonArray = require('sort-json-array');


export interface Motivos {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-confirmacion',
  templateUrl: './cancelar-alquiler.component.html',
  styleUrls: ['./cancelar-alquiler.component.css'],
  providers: [AuthService, { provide: MAT_DATE_LOCALE, useValue: 'es-LA' }, UploadService]

})
export class CancelarAlquilerComponent implements OnInit {

  //Para traer los datos de la BD en el form
  public user = {};
  emailLogueado = localStorage.getItem("email");

  //Para armar JSON
  hoy = new Date();
  motivosCancelacion: Motivos[];
  constructor(private _auth: AuthService, private singletoon: SingletonService, private _snackBar: MatSnackBar, private _adapter: DateAdapter<any>, private singleton: SingletonService, private _router: Router, private _uploadService: UploadService,public dialog: MatDialog) { }

  ngOnInit() {
   
    if (this.verificarInicioSesion() == false) {
      return;
    }

    this.crearJSONmotivos();
  }

  reclamoData = { tipo: undefined, motivo: undefined}


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


  // cancelarDialogRef: MatDialogRef<CancelarDialogComponent>;
  // openDialogCancelar(): void {
  //   this.cancelarDialogRef = this.dialog.open(CancelarDialogComponent,
  //     {
  //       data: {
  //        // alquiler: alquiler
  //       }
  //     });
  //   this.cancelarDialogRef.afterClosed().subscribe(result => {
  //     console.log('ak');
  //     this.ngOnInit();
  //   })
  // }

  reclamar() {
    
    this._auth.registrar_reclamo(this.reclamoData).subscribe(
      
      res => {
        
        
      },
      err => {
        console.log(err)
        
      }
    )
    this._router.navigate(['/mi-cuenta/mis-alquileres']);
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



