import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-confirmacion-destacacion',
  templateUrl: './confirmacion-destacacion.component.html',
  styleUrls: ['./confirmacion-destacacion.component.css']
})
export class ConfirmacionDestacacionComponent implements OnInit {

  constructor(private _auth: AuthService) { }

  id_publicacion;

  ngOnInit() {
    this.id_publicacion = String(window.location.href).slice(48);
    this._auth.update_publicacion(this.id_publicacion, { pago_destacacion: true }).subscribe(
      res => {
        console.log(res);
      }
    )
  }

  irHome() {
    window.location.assign("/home")
  }

}
