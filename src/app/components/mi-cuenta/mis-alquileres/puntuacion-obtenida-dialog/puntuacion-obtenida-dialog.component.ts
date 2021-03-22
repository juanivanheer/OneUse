import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-puntuacion-obtenida-dialog',
  templateUrl: './puntuacion-obtenida-dialog.component.html',
  styleUrls: ['./puntuacion-obtenida-dialog.component.css']
})
export class PuntuacionObtenidaDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<PuntuacionObtenidaDialogComponent>, private _auth: AuthService, @Inject(MAT_DIALOG_DATA) private data) { }

  puntuacion;
  comentario;

  seleccion1;
  seleccion2;
  seleccion3;
  seleccion4;
  seleccion5;

  ngOnInit() {
    if(this.data.tipo == "locador-locatario"){
      //ES EL LOCATARIO QUE VE LO QUE PUSO EL PROPIETARIO
      this.puntuacion = this.data.alquiler.puntuacion_propietario_al_locatario;
      this.comentario = this.data.alquiler.comentario_propietario_al_locatario;
    } else {
      //ES EL PROPIETARIO QEU VE LO QUE PUSO QUIEN LE ALQUILÓ
      this.puntuacion = this.data.alquiler.puntuacion_locatario_al_propietario;
      this.comentario = this.data.alquiler.comentario_locatario_al_propietario;
    }
    this.colorear()
  }

  colorear() {
    if (this.puntuacion == 1) {
      this.seleccion1 = true;
      this.seleccion2 = false;
      this.seleccion3 = false;
      this.seleccion4 = false;
      this.seleccion5 = false;
    }
    if (this.puntuacion == 2) {
      this.seleccion1 = true;
      this.seleccion2 = true;
      this.seleccion3 = false;
      this.seleccion4 = false;
      this.seleccion5 = false;
    }
    if (this.puntuacion == 3) {
      this.seleccion1 = true;
      this.seleccion2 = true;
      this.seleccion3 = true;
      this.seleccion4 = false;
      this.seleccion5 = false;
    }
    if (this.puntuacion == 4) {
      this.seleccion1 = true;
      this.seleccion2 = true;
      this.seleccion3 = true;
      this.seleccion4 = true;
      this.seleccion5 = false;
    }
    if (this.puntuacion == 5) {
      this.seleccion1 = true;
      this.seleccion2 = true;
      this.seleccion3 = true;
      this.seleccion4 = true;
      this.seleccion5 = true;
    }
  }

  close() {
    this.dialogRef.close();
  }


}
