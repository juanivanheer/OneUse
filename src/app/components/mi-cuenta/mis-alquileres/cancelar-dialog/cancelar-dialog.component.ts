import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cancelar-dialog',
  templateUrl: './cancelar-dialog.component.html',
  styleUrls: ['./cancelar-dialog.component.css']
})
export class CancelarDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<CancelarDialogComponent>, private _auth:AuthService, @Inject(MAT_DIALOG_DATA) private data) { }

  alquileres = [];
  titulo: string;
  hayAlquileres: boolean;
  imagen;
  imagenJSON;
  arrayJSON = [];
  arrayImagen = [];

  ngOnInit() {
    
  }

  close() {
    this.dialogRef.close();
  }

prueba(){

let alquiler = JSON.parse(localStorage.getItem("alquiler"));

console.log(alquiler);

   this._auth.cancelarAlquiler(alquiler).subscribe()

   localStorage.removeItem("alquiler");

}

}
