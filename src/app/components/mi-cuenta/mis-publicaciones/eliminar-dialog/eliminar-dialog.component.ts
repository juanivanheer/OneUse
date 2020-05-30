import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-dialog',
  templateUrl: './eliminar-dialog.component.html',
  styleUrls: ['./eliminar-dialog.component.css']
})
export class EliminarDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<EliminarDialogComponent>, private _auth:AuthService, @Inject(MAT_DIALOG_DATA) private data) { }

  publicaciones = [];
  titulo: string;
  hayPublicaciones: boolean;
  imagen;
  imagenJSON;
  arrayJSON = [];
  arrayImagen = [];

  ngOnInit() {
    this._auth.get_publicacion(localStorage.getItem("email")).subscribe(
      err => {
        this.hayPublicaciones = true;
        this.publicaciones = err.publicaciones;
        for (let i = 0; i < this.publicaciones.length; i++) {
          this.imagen = this.publicaciones[i].multiplefile;
          this.imagenJSON = JSON.parse(this.imagen); //CREA JSON CONVERTIDO DE STRING
          for (let j in this.imagenJSON) {
            this.arrayJSON.push(this.imagenJSON[j]);
          }
          this.publicaciones[i].multiplefile = this.arrayJSON;
          this.arrayJSON = [];
        }

      },
      res => {
        //console.log(res);
        this.titulo = "No hay publicaciones para mostrar"
        this.hayPublicaciones = false;
      }
    )
  }

  close() {
    this.dialogRef.close();
  }

  eliminarPublicacion() {
    this._auth.delete_publicacion(this.data.publicacion._id).subscribe(
      err => {
        this.ngOnInit();
      },
      res => {
        this.ngOnInit();
      }
    )
  }

}
