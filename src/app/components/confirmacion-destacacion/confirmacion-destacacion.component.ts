import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-confirmacion-destacacion',
  templateUrl: './confirmacion-destacacion.component.html',
  styleUrls: ['./confirmacion-destacacion.component.css']
})
export class ConfirmacionDestacacionComponent implements OnInit {

  constructor(private _auth: AuthService) { }

  ngOnInit() {
    let url = new URL(window.location.href)
    console.log(url.searchParams.toString())
    let id = url.searchParams.get("id"), tipo_destacacion = url.searchParams.get("tipo_destacacion"), fecha_caducacion = new Date();
    let fecha = new Date();
    if(tipo_destacacion == "gold"){
      fecha_caducacion.setMonth(fecha.getMonth() + 1)
    } else {
      fecha_caducacion.setDate(fecha.getDate() + 7)
    }

    this._auth.update_publicacion(id, { pago_destacacion: true, fecha_caducacion_destacacion: fecha_caducacion.toISOString()}).subscribe(
      res => {
        console.log(res);
      }
    )
  }

  irHome() {
    window.location.assign("/home")
  }

}
