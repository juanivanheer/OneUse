import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import "rxjs/add/observable/zip";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-confirmacion-destacacion',
  templateUrl: './confirmacion-destacacion.component.html',
  styleUrls: ['./confirmacion-destacacion.component.css']
})
export class ConfirmacionDestacacionComponent implements OnInit {

  constructor(private _auth: AuthService) { }

  ngOnInit() {
    let url = new URL(window.location.href)
    let id = url.searchParams.get("id");
    let tipo_destacacion = url.searchParams.get("tipo_destacacion");
    let fecha_caducacion = new Date();
    let fecha = new Date();
    let email = url.searchParams.get("email");

    if (tipo_destacacion == "gold") {
      fecha_caducacion.setMonth(fecha.getMonth() + 1)
    } else {
      fecha_caducacion.setDate(fecha.getDate() + 7)
    }

    let fecha_caducacion_formatted = fecha_caducacion.getDate() + "/" + (fecha_caducacion.getMonth() + 1) + "/" + fecha_caducacion.getFullYear()

    // enviar(objeto.email, objeto.asunto, objeto.titulo, objeto.mensaje, objeto.url, objeto.mensajeBoton);
    let objeto = {
      email: email,
      asunto: "Destacación de tu publicación",
      titulo: "¡Tu publicación ha sido destacada!",
      mensaje: "¡Felicitaciones! Ahora tu publicación aparecerá de manera aleatoria en nuestra página de inicio hasta el " + fecha_caducacion_formatted,
      url: "https://localhost:4200/home",
      mensajeBoton: "Ir al inicio"
    }
    var obsA = this._auth.update_publicacion(id, { destacar: 'SI', pago_destacacion: true, fecha_caducacion_destacacion: fecha_caducacion.toISOString(), tipo_destacacion: tipo_destacacion })
    var obsB = this._auth.enviarEmail(objeto);
    const obsvArray = [obsA, obsB];
    const zip = Observable.zip(...obsvArray)
    zip.subscribe(
      res => {

      }
    );
  }

  irHome() {
    window.location.assign("/home")
  }

}
