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

  constructor(private dialogRef: MatDialogRef<DenunciarDialogComponent>, private _auth: AuthService, @Inject(MAT_DIALOG_DATA) public data) { }
  seleccionado;
  comentario = "";
  tipos: Tipos[]

  usuario_denunciado;

  ngOnInit() {
    let usuarios = this.data.usuarios;
    for (let i = 0; i < usuarios.length; i++) {
      const element = usuarios[i];
      if (this.data.tipo == "pregunta") {
        if (element.name == this.data.pyr.usuario_pregunta) {
          this.usuario_denunciado = element;
        }
      }
      if (this.data.tipo == "respuesta") {
        if (element.name == this.data.pyr.usuario_publicacion) {
          this.usuario_denunciado = element;
        }
      }
      if (this.data.tipo == "publicacion") {
        if (element.email == this.data.publicacion.email) {
          this.usuario_denunciado = element;
        }
      }
    }

    if (this.data.tipo == "pregunta" || this.data.tipo == "respuesta") {
      this.tipos = [
        { value: 'ninguno', viewValue: "- Selecciona una opción - " },
        { value: 'ilegal', viewValue: "El comentario posee venta de artículos ilegales" },
        { value: 'violencia', viewValue: "El comentario posee lenguaje que incitan a la violencia" },
        { value: 'spam', viewValue: "El comentario no corresponde con la publicación" },
        { value: 'desnudos', viewValue: "El comentario posee desnudos o actividad sexual" },
        { value: 'acoso', viewValue: "El comentario incita al acoso a otra persona" },
        { value: 'no_gusta', viewValue: "El comentario no me gusta" },
      ]
    }

    if (this.data.tipo == "publicacion") {
      this.tipos = [
        { value: 'ninguno', viewValue: "- Selecciona una opción - " },
        { value: 'ilegal', viewValue: "La publicación posee alquiler de artículos ilegales" },
        { value: 'violencia', viewValue: "La publicación posee lenguaje que incita a la violencia" },
        { value: 'spam', viewValue: "La publicación es spam" },
        { value: 'desnudos', viewValue: "La publicación posee desnudos o actividad sexual" },
        { value: 'acoso', viewValue: "La publicación incita al acoso a otra persona" },
        { value: 'no_gusta', viewValue: "La publicación no me gusta" },
      ]
    }
  }

  close() {
    this.dialogRef.close("Salir");
  }

  deshabilitarEnviar() {
    if (this.seleccionado == "ninguno" || this.seleccionado == undefined) {
      return true;
    } else {
      return false;
    }
  }

  denunciarMensaje() {
    let mensaje_denunciado;
    if (this.data.tipo == "pregunta") {
      if (this.data.pyr.contador_denuncias_pregunta == undefined) {
        Object.assign(this.data.pyr, { contador_denuncias_pregunta: 1 });
      } else {
        this.data.pyr.contador_denuncias_pregunta++;
      }
      mensaje_denunciado = this.data.pyr.pregunta;
    } else {
      if (this.data.pyr.contador_denuncias_respuesta == undefined) {
        Object.assign(this.data.pyr, { contador_denuncias_respuesta: 1 });
      } else {
        this.data.pyr.contador_denuncias_respuesta++;
      }
      mensaje_denunciado = this.data.pyr.respuesta;
    }

    let objeto = {
      mensaje_denunciado: mensaje_denunciado,
      denuncia: {
        tipo: this.data.tipo,
        tipo_denuncia: this.seleccionado,
        comentario: this.comentario,
        usuario_denunciante: this.data.usuario,
      },
      publicacion: this.data.publicacion,
      pyr: this.data.pyr,
      estado: undefined,
      usuario_denunciado: this.usuario_denunciado,
      deshabilitado: false,
      tipo_denuncia: this.data.tipo
    }

    var obsA = this._auth.update_pyr(this.data.pyr._id, this.data.pyr);
    var obsB = this._auth.registrar_denuncia(objeto)
    const obsvArray = [obsA, obsB];
    const zip = Observable.zip(...obsvArray)
    zip.subscribe(
      res => {
        console.log(res);
        this.dialogRef.close("Enviar");
      },
      err => {
        console.log(err)
      }
    )
  }

  denunciarPublicacion() {
    let objeto_denuncia = {
      mensaje_denunciado: undefined,
      denuncia: {
        tipo: this.data.tipo,
        tipo_denuncia: this.seleccionado,
        comentario: this.comentario,
        usuario_denunciante: this.data.usuario,
      },
      publicacion: this.data.publicacion,
      pyr: undefined,
      estado: undefined,
      usuario_denunciado: this.usuario_denunciado,
      deshabilitado: false,
      tipo_denuncia: this.data.tipo
    }

    if (this.data.publicacion.deshabilitada == undefined) {
      Object.assign(this.data.publicacion, { deshabilitada: false })
    }

    var obsA = this._auth.update_publicacion(this.data.publicacion._id, this.data.publicacion);
    var obsB = this._auth.registrar_denuncia(objeto_denuncia)
    const obsvArray = [obsA, obsB];
    const zip = Observable.zip(...obsvArray)
    zip.subscribe(
      res => {
        console.log(res);
        this.dialogRef.close("Enviar");
      },
      err => {
        console.log(err)
      }
    )
  }
}
