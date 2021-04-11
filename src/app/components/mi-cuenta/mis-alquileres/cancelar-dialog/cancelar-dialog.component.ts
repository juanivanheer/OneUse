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
  q
  

  ngOnInit() {
    
  }

  close() {
    this.dialogRef.close();
  }

  cancelar_alquiler(){
  
  let quien_cancela = localStorage.getItem("email");
  let alquiler = JSON.parse(localStorage.getItem("alquiler"));
  
  this._auth.user_data(quien_cancela).subscribe(
    res => {
    this.q = res.name

    if(alquiler.name_usuarioLocatario == res.name)
      alquiler.estado = 'Cancela Locatario'
    else
      alquiler.estado = 'Cancela Propietario'

    
    this._auth.cancelarAlquiler(alquiler).subscribe()
    this.dialogRef.close();
    
  },
  err => {
    
  }
  
  )

 
  localStorage.removeItem("alquiler");
  
  

  }

}
