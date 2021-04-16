import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/zip";

export interface Tipos {
  viewValue: string,
  value: string
}

@Component({
  selector: 'app-denunciar-dialog',
  templateUrl: './denunciar-dialog.component.html',
  styleUrls: ['./denunciar-dialog.component.css']
})
export class DenunciarDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DenunciarDialogComponent>, private _auth: AuthService, @Inject(MAT_DIALOG_DATA) private data) { }
  seleccionado;
  comentario = "";
  tipos: Tipos[] = [
    { value: 'ninguno', viewValue: "- Selecciona una opción - " },
    { value: 'ilegal', viewValue: "El comentario posee venta de artículos ilegales" },
    { value: 'violencia', viewValue: "El comentario posee lenguaje que incitan a la violencia" },
    { value: 'spam', viewValue: "El comentario no corresponde con la publicación" },
    { value: 'desnudos', viewValue: "El comentario posee desnudos o actividad sexual" },
    { value: 'acoso', viewValue: "El comentario incita al acoso a otra persona" },
    { value: 'no_gusta', viewValue: "El comentario no me gusta" },
  ]

  ngOnInit() {

  }

  close() {
    this.dialogRef.close();
  }

  deshabilitarEnviar() {
    if (this.seleccionado == "ninguno" || this.seleccionado == undefined) {
      return true;
    } else {
      return false;
    }
  }

  enviar() {
    if (this.data.tipo == "pregunta") {
      if (this.data.pyr.contador_denuncias_pregunta == undefined) {
        Object.assign(this.data.pyr, { contador_denuncias_pregunta: 1 });
      } else {
        this.data.pyr.contador_denuncias_pregunta++;
      }
    } else {
      if (this.data.pyr.contador_denuncias_respuesta == undefined) {
        Object.assign(this.data.pyr, { contador_denuncias_respuesta: 1 });
      } else {
        this.data.pyr.contador_denuncias_respuesta++;
      }
    }

    let objeto = {
      tipo: this.data.tipo,
      tipo_denuncia: this.seleccionado,
      comentario: this.comentario,
      publicacion: this.data.publicacion,
      usuario_denunciante: this.data.usuario,
      pyr: this.data.pyr
    }

    var obsA = this._auth.update_pyr(this.data.pyr._id,this.data.pyr);
    var obsB = this._auth.registrar_denuncia(objeto)
    const obsvArray = [obsA, obsB];
    const zip = Observable.zip(...obsvArray)
    zip.subscribe(
      res => {
        console.log(res)
        this.close();
      },
      err => {
        console.log(err)
        this.close();
      }
    )
  }
}
