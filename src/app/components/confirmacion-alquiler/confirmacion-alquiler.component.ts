import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-confirmacion-alquiler',
  templateUrl: './confirmacion-alquiler.component.html',
  styleUrls: ['./confirmacion-alquiler.component.css']
})
export class ConfirmacionAlquilerComponent implements OnInit {

  constructor(private _auth: AuthService) { }

  id_alquiler;

  ngOnInit() {
    this.id_alquiler = String(window.location.href).slice(45, 69);
    console.log(this.id_alquiler)
    this._auth.registrar_EnProcesoEntrega(this.id_alquiler).subscribe(
      res => {
        console.log(res);
      }
    )
  }

}
