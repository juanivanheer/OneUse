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
    var url = new URL(window.location.href)
    var id = url.searchParams.get("id");
    this._auth.get_publicacion_id(id).subscribe(
      res => {
        var tipo_destacacion = url.searchParams.get("tipo_destacacion");
        var fecha_caducacion = new Date();
        var fecha = new Date();
        var monto_destacacion;

        if (tipo_destacacion == "gold") {
          fecha_caducacion.setMonth(fecha.getMonth() + 1)
        } else {
          fecha_caducacion.setDate(fecha.getDate() + 7)
        }

        var fecha_caducacion_formatted = fecha_caducacion.getDate() + "/" + (fecha_caducacion.getMonth() + 1) + "/" + fecha_caducacion.getFullYear()

        if (tipo_destacacion == 'gold') {
          monto_destacacion = 2800
        } else {
          monto_destacacion = 2000
        }

        var objeto = {
          email: res.email,
          asunto: "Destacación de tu publicación",
          titulo: "¡Tu publicación ha sido destacada!",
          mensaje: "¡Felicitaciones! Ahora tu publicación aparecerá de manera aleatoria en nuestra página de inicio hasta el " + fecha_caducacion_formatted,
          url: "https://localhost:4200/home",
          mensajeBoton: "Ir al inicio",
          fecha_caducacion_formatted: fecha_caducacion_formatted,
          publicacion: res,
          tipo_destacacion: tipo_destacacion,
          monto_destacacion: monto_destacacion
        }

        let pago = {
          payment_id: url.searchParams.get("payment_id"),
          preference_id: url.searchParams.get("preference_id"),
          status: url.searchParams.get("status"),
          payment_type: url.searchParams.get("payment_type")
        }

        Object.assign(objeto, pago);

        var obsA = this._auth.update_publicacion(id, { destacar: 'SI', pago_destacacion: true, fecha_caducacion_destacacion: fecha_caducacion.toISOString(), tipo_destacacion: tipo_destacacion, pago: pago })
        var obsB = this._auth.enviarComprobanteDestacacion(objeto);
        const obsvArray = [obsA, obsB];
        const zip = Observable.zip(...obsvArray)
        zip.subscribe(
          res => {

          }
        );
      }
    )



  }

  irHome() {
    window.location.assign("/home")
  }

}
