import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-puntuacion-dialog',
  templateUrl: './puntuacion-dialog.component.html',
  styleUrls: ['./puntuacion-dialog.component.css']
})
export class PuntuacionComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<PuntuacionComponent>, private _auth: AuthService, @Inject(MAT_DIALOG_DATA) private data) { }

  alquiler;
  tipo;
  seleccion1: boolean = false;
  seleccion2: boolean = false;
  seleccion3: boolean = false;
  seleccion4: boolean = false;
  seleccion5: boolean = false;
  comentario;

  ngOnInit() {
    this.alquiler = this.data.alquiler;
    this.tipo = this.data.tipo;
  }

  seleccion(estrella) {
    if (estrella == 1) {
      this.seleccion1 = true;
      this.seleccion2 = false;
      this.seleccion3 = false;
      this.seleccion4 = false;
      this.seleccion5 = false;
    }
    if (estrella == 2) {
      this.seleccion1 = true;
      this.seleccion2 = true;
      this.seleccion3 = false;
      this.seleccion4 = false;
      this.seleccion5 = false;
    }
    if (estrella == 3) {
      this.seleccion1 = true;
      this.seleccion2 = true;
      this.seleccion3 = true;
      this.seleccion4 = false;
      this.seleccion5 = false;
    }
    if (estrella == 4) {
      this.seleccion1 = true;
      this.seleccion2 = true;
      this.seleccion3 = true;
      this.seleccion4 = true;
      this.seleccion5 = false;
    }
    if (estrella == 5) {
      this.seleccion1 = true;
      this.seleccion2 = true;
      this.seleccion3 = true;
      this.seleccion4 = true;
      this.seleccion5 = true;
    }
  }

  obtenerCantidad() {
    if (this.seleccion1 == true && this.seleccion2 == false && this.seleccion3 == false && this.seleccion4 == false && this.seleccion5 == false) {
      return 1;
    }
    if (this.seleccion1 == true && this.seleccion2 == true && this.seleccion3 == false && this.seleccion4 == false && this.seleccion5 == false) {
      return 2;
    }
    if (this.seleccion1 == true && this.seleccion2 == true && this.seleccion3 == true && this.seleccion4 == false && this.seleccion5 == false) {
      return 3;
    }
    if (this.seleccion1 == true && this.seleccion2 == true && this.seleccion3 == true && this.seleccion4 == true && this.seleccion5 == false) {
      return 4;
    }
    if (this.seleccion1 == true && this.seleccion2 == true && this.seleccion3 == true && this.seleccion4 == true && this.seleccion5 == true) {
      return 5;
    }
  }

  enviar() {
    let puntuacion = this.obtenerCantidad();
    if (this.data.tipo == "locador-locatario") {
      this._auth.registrar_puntuacion("propietario", puntuacion, this.comentario, this.alquiler._id).subscribe(
        res => {
          this._auth.get_all_alquileres().subscribe(
            res2 => {
              for (let i = 0; i < res2.length; i++) {
                const element = res2[i];
                if (element.estado == "En proceso de puntuación") {
                  this._auth.verificar_finalizacion(element._id).subscribe(
                    res3 => {
                      console.log(res3);
                    }
                  );
                }
              }
      
            }
          )
          this.close();
        }
      )
    } else {
      this._auth.registrar_puntuacion("locatario", puntuacion, this.comentario, this.alquiler._id).subscribe(
        res => {
          this._auth.get_all_alquileres().subscribe(
            res2 => {
              for (let i = 0; i < res2.length; i++) {
                const element = res2[i];
                if (element.estado == "En proceso de puntuación") {
                  this._auth.verificar_finalizacion(element._id).subscribe(
                    res3 => {
                      console.log(res3);
                    }
                  );
                }
              }
      
            }
          )
          this.close();
        }
      )
    }
  }

  habilitarEnviar(texto) {
    let cantidad = this.obtenerCantidad();
    if (texto.length > 30 && cantidad > 0) {
      return false;
    } else return true;
  }

  close() {
    this.dialogRef.close();
  }

}
